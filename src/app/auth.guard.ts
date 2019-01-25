import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UsersService} from './shared/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  isUserValid: Boolean;
  constructor(private usersService: UsersService, private router: Router){   
    /*this.usersService.verifyToken().subscribe(
      res => console.log(res),
      err => {        
              this.router.navigate(['/login'])          
      }
    )*/
  }

  canActivate(): boolean {   
    if(this.usersService.loggedIn()){
      return true
    }
  else
    {
      this.router.navigate(['./login'])
      return false
    }  
  }
}
