import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../shared/users.service';
import {Users} from '../users';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})

export class DocumentUploadComponent implements OnInit {
  selectedFile:File;
  @ViewChild('userDoc') User_Document;
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
          accountNum: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(17)]],
          file: [null]
      });
      
  } 

  get f() { return this.uploadForm.controls; }

  documentSubmit(){      
      this.submitted = true;                 
      if (this.uploadForm.invalid) {
        return;
    }
    const file = this.User_Document.nativeElement;
    if (file.files && file.files[0]) {
      this.selectedFile = file.files[0];
    }
    const ImageFile: File = this.selectedFile;
   //console.log(ImageFile);
    const formdata:FormData = new FormData();
    formdata.append("firstName", this.users.firstName);
    formdata.append("lastName", this.users.lastName);
    formdata.append("email", this.users.email);
    formdata.append("accountNum", this.users.accountNum);
    formdata.append("routingNum", this.users.routingNum);
    formdata.append("file", ImageFile, ImageFile.name);
      this.usersService.createUsers(formdata).subscribe(
        data=>{
          console.log(data);          
        },
        error=>{
          console.log(error);
        }
      )      
      
      this.resetForm();
  }
 
  resetForm(){
    this.uploadForm.reset();
    this.submitted = false;    
  } 
}
