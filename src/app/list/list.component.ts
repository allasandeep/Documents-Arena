import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Users } from '../users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private allusers: Users[];
  constructor(private _usersService:UsersService, private router: Router) { }

  ngOnInit() {
    this.readUsers();
  }

  readUsers(){
    this._usersService.readUsers().subscribe(
      data=>{
        console.log(data);
        this.allusers= data['msg'];
      },
      error=>{
        console.log(error);
      }
    )
  }

  doUpdate(users){
    this._usersService.setter(users);
    this.router.navigate(['/createUpdate']);
  }

  doDelete(users){
    this._usersService.deleteUsers(users._id).subscribe(
      data=>{
        this.allusers.splice(this.allusers.indexOf(users),1);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
