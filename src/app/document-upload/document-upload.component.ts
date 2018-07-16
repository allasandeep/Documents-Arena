import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../shared/users.service';
import {Users} from '../users';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})

export class DocumentUploadComponent implements OnInit {

  selectedFiles: FileList;
  private users:Users;
  constructor(private usersService:UsersService, private router:Router) { }

  ngOnInit() {   
   
        this.users= {
          'firstName':null,
          'lastName':null,
          'email' : null,
          'routingNum' : null,
          'accountNum': null
        }
      
  } 

  documentUpdate(){
    
      this.usersService.createUsers(this.users).subscribe(
        data=>{
          console.log(data);          
        },
        error=>{
          console.log(error);
        }
      )    
    
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
