import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router'; 
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  invalidForm = false;
  constructor(private usersService:UsersService, private router: Router, private formBuilder: FormBuilder) { }
  
  ngOnInit() {

    this.registerForm = this.formBuilder.group({      
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, , Validators.minLength(6)]]       
  });
  }

  get f() { return this.registerForm.controls; }

  registerUser(){
     this.submitted = true; 
     if (this.registerForm.invalid) {
         return;
      }
      
      if( this.f.password.value != null && this.f.confirmpassword.value != null && this.f.password.value != this.f.confirmpassword.value)
        {
          this.invalidForm = true;
          return;
        }
        else
          this.invalidForm = false;

        this.usersService.registerUser(JSON.stringify(this.registerForm.value)).subscribe(
          data=> {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error=>console.log(error)          
        )      
  }

}
