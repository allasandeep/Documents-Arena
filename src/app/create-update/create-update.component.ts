import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../shared/users.service';
import {Users} from '../users';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {
  private users:Users;
  constructor(private usersService:UsersService, private router:Router) { }

  ngOnInit() {
    this.users = this.usersService.getter();
  }

  createOrUpdate(){
    if(this.users._id == undefined){
    this.usersService.createUsers(this.users).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/list']);
      },
      error=>{
        console.log(error);
      }
    )
  }
  else{
    this.usersService.updateUsers(this.users).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/list']);
      },
      error=>{
        console.log(error);
      }
    )

  }
  }

}
