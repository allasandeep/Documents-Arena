var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/DocumentsArena', {useNewUrlParser: true }, (err, client) => {
        
    var db = client.db('DocumentsArena');

    if(err){
            return console.log(err);
        }
        closure(db);
    });

}

let response = {
    status: 200,
    message: null,
    data:[]
}

var sendError = (err , res) => {
    response.status = 501;
    response.message = typeof err == "object" ? err.message : err;
    res.status(501).json(response);
}

router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users').find().toArray().then((users) => {
            response.data = users;
            res.json(response);
        })
    })
})

module.exports = router;