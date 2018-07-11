var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var app = express();

var api = require('./server/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist/Documents-Arena')));

app.use('/', api);

app.get('/' , function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/Documents-Arena/index.html'))
});

var port = process.env.PORT || '4200';
app.set('port', port);

var server = http.createServer(app);
server.listen(port, () => console.log("Server is running"));