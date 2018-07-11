import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  selectedFiles: FileList;

  constructor() { }

  ngOnInit() {
  }

  upload() {
    const file = this.selectedFiles.item(0);
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
