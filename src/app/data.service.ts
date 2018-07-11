import { Injectable, Input } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Observable';


@Injectable()

export class DataService {
  result;


  constructor(private _http: Http) {

   }

   getUsers(){
     return this._http.get('/users').map(result => this.result = result.json().data);
     }
}
