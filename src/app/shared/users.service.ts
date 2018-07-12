import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private users:Users;
  private baseUri:string = "http://localhost:8080";
  private headers = new HttpHeaders().set('content-Type','application/json');
  constructor(private http:HttpClient) { }

  createUsers(users:Users){
    return this.http.post(this.baseUri+'/create',  users, {headers:this.headers});
  }

  readUsers(){
    return this.http.get(this.baseUri+'/read', {headers:this.headers});
  }

  updateUsers(users:Users){
    return this.http.put(this.baseUri+'/update',  users, {headers:this.headers});
  }

  deleteUsers(id:string){
    return this.http.delete(this.baseUri+'/delete/'+id, {headers:this.headers});
  }

  setter(users:Users){
    this.users = users;
  }

  getter(){
    return this.users;
  }
}
