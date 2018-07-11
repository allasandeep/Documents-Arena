import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Documents Arena';
  description = 'Simply buy or sell documents!';
  users: Array<any>;
  constructor(private _dataService: DataService){
    this._dataService.getUsers().subscribe(response => this.users = response);
  }
}
