import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../users';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private users:Users;
  private baseUri:string = "http://localhost:8080";
  //private headers = new HttpHeaders().set('content-Type','application/json');
  constructor(private http:Http) { }  

  createUsers(formGroup){                           
    return this.http.post(this.baseUri+'/create', formGroup).map(res => res.json());
  }

 /* readUsers(){
    return this.http.get(this.baseUri+'/read', {headers:this.headers});
  }

  updateUsers(users:Users){
    return this.http.put(this.baseUri+'/update',  users, {headers:this.headers});
  }

  deleteUsers(id:string){
    return this.http.delete(this.baseUri+'/delete/'+id, {headers:this.headers});
  }*/

  setter(users:Users){
    this.users = users;
  }

  getter(){
    return this.users;
  }
}
