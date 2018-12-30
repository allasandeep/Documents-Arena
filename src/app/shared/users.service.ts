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
  private headers = new HttpHeaders().set('content-Type','application/json');
  constructor(private http:Http, private _http:HttpClient) { }  

  createUsers(formGroup){                           
    return this.http.post(this.baseUri+'/create', formGroup).map(res => res.json());
  }

  readUsers(){
    return this.http.get(this.baseUri+'/readall').map(res => res.json());
  }

  downloadFile(file:string){
    var body = {filename:file};
    return this._http.post(this.baseUri+'/download', body, {
      responseType : 'blob',
      headers: this.headers
    });
  }

  charge(token: any, amount, fName){    
    const body = {token, amount, fName};
    return this.http.post(this.baseUri+'/stripeCharge', body).map(res => res.json());
  }

  /*
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
