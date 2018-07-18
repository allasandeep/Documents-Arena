import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../shared/users.service';
import {Users} from '../users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})

export class DocumentUploadComponent implements OnInit {

  selectedFiles: FileList;
  private users:Users;
  uploadForm: FormGroup;
  submitted = false;
  constructor(private usersService:UsersService, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {   
   
        this.users= {
          'firstName':null,
          'lastName':null,
          'email' : null,
          'routingNum' : null,
          'accountNum': null
        }

        this.uploadForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          routingNum: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
          accountNum: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(17)]]
      });
      
  } 

  get f() { return this.uploadForm.controls; }

  documentUpdate(){
      this.submitted = true;
      if (this.uploadForm.invalid) {
        return;
    }
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
