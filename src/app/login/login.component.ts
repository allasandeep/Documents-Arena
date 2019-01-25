import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router'; 
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; 
  submitted = false;
  constructor(private usersService:UsersService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {   

    this.loginForm = this.formBuilder.group({      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]       
  });

  }

  get f() { return this.loginForm.controls; }

  loginUser(){
    this.submitted = true; 
    if (this.loginForm.invalid) {
      return;
     }    

    this.usersService.loginUser(this.loginForm.value).subscribe(
      data=>{               
        localStorage.setItem('token', data.toString()); 
        this.router.navigate(['/']);                 
      },
      error=>{
          console.log(error);
      }
    )  
  }

}
