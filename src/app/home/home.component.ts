import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../shared/users.service';
import {Users} from '../users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private usersService:UsersService) { }

  ngOnInit() {
  }

  newDocument(event:any){
    event.preventDefault();
    this.usersService.setter(new Users());
    this.router.navigate(['/createUpdate']);

  }

}
