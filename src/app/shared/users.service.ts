import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Users } from '../users';
import { Http} from '@angular/http';
import { Router } from '@angular/router'; 
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private users:Users;
  private baseUri:string = "http://localhost:8080";
  private headers = new HttpHeaders().append('content-Type','application/json');
  constructor(private http:Http, private _http:HttpClient, private router:Router) { }  

 createUsers(formGroup){                           
    return this.http.post(this.baseUri+'/create', formGroup).map(res => res.json());
  }

  readDocuments(){
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

  loginUser(body:any){
    return this._http.post(this.baseUri + '/login', body, {
      observe:'body'   
    });
  }

  registerUser(body:any){
    return this._http.post(this.baseUri + '/register', body, {
      observe: 'body',
      headers: this.headers
    });
  }

  verifyToken(){
    return this._http.get(this.baseUri + '/verifyToken' ,{
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getToken() {
    return localStorage.getItem('token')
  }
  
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  
  logout(){   
    localStorage.removeItem('token'); 
    this.router.navigate(['./']);   
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
