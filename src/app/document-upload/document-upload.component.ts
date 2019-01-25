import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService} from '../shared/users.service';
import { Users} from '../users';
import { MapsAPILoader } from '@agm/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})

export class DocumentUploadComponent implements OnInit {
  selectedFile:File;
  selectedFileName;
  @ViewChild('userDoc') User_Document;
  private users:Users;
  uploadForm: FormGroup;
  submitted = false;
  isSuccess:Boolean;
  isNotSuccess:Boolean;
  zipCode:string;  
  userData:string;
  @ViewChild('searchAddress') public searchAddress: ElementRef;
  private addressFound: string;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private usersService:UsersService, private router:Router, private formBuilder: FormBuilder) {
    }

  ngOnInit() {   
    
    this.usersService.verifyToken().subscribe(
      res => {
        this.userData = JSON.stringify(res)},
      err => console.log(err)
    )

    this.mapsAPILoader.load().then(
      () => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchAddress.nativeElement, { types:["address"] });
            autocomplete.addListener("place_changed", () => {
                      this.ngZone.run(() => {
                      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                      if(place.geometry === undefined || place.geometry === null )
                      {
                        return;
                      }
                      for (var i = 0; i < place.address_components.length; i++) {
                        for (var j = 0; j < place.address_components[i].types.length; j++) {
                          if (place.address_components[i].types[j] == "postal_code") {
                            this.zipCode = " ";
                            this.zipCode = place.address_components[i].long_name;                                  
                          }
                        }
                      }
                  });
              });
          });        
        
        this.isSuccess = false;
        this.isNotSuccess = false;
        this.addressFound = null;
        this.users= {
          'firstName':null,
          'lastName':null,
          'email' : null,
          'routingNum' : null,
          'accountNum': null,
          'fileAddress': null,
          'fileCity': null,
          'fileState': null,
          'fileCountry': null,
          'fileZip' : null,
          'filePrice' : null                                                    
        }          
        
        this.uploadForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          routingNum: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
          accountNum: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(17)]],
          file: ['', Validators.required],
          fileAddress: ['', Validators.required],
          fileCity: ['', Validators.required],
          fileState: ['', Validators.required],
          fileCountry: ['', Validators.required],
          fileZip: ['', Validators.required],
          filePrice: ['', Validators.required],
          addressFound:['']  
      });
      
  } 

  get f() { return this.uploadForm.controls; }

  fillAddressFields(streetAddress){    
    let address, street, city, state, country;
    
    if(streetAddress != null)
    {
      address = streetAddress.split(","); 
      street = address[0];
      city = address[1].trim();
      state = address[2].trim();
      country = address[3].trim();
      this.users.fileAddress = street;
      this.users.fileCity = city;
      this.users.fileState = state;
      this.users.fileCountry = country;          
      this.users.fileZip = this.zipCode;
     
    }
  }

  documentSubmit(){      
      this.submitted = true;                 
      if (this.uploadForm.invalid) {
        return;
    }
    const file = this.User_Document.nativeElement;
    if (file.files && file.files[0]) {
      this.selectedFile = file.files[0];
    }
    const ImageFile: File = this.selectedFile;
    this.selectedFileName = ImageFile.name;
    const datetime = new Date();
    const fileName = (datetime.getTime() + Math.random()).toLocaleString();    
   //console.log(ImageFile);
    const formdata:FormData = new FormData();
    formdata.append("userId", this.userData);
    formdata.append("firstName", this.users.firstName);
    formdata.append("lastName", this.users.lastName);
    formdata.append("email", this.users.email);
    formdata.append("accountNum", this.users.accountNum);
    formdata.append("routingNum", this.users.routingNum);
    formdata.append("fileAddress", this.users.fileAddress);
    formdata.append("fileCity", this.users.fileCity);
    formdata.append("fileState", this.users.fileState);
    formdata.append("fileCountry", this.users.fileCountry);
    formdata.append("fileZip", this.users.fileZip);
    formdata.append("filePrice", this.users.filePrice);
    formdata.append("file", ImageFile, fileName);
      this.usersService.createUsers(formdata).subscribe(
        data=>{
            if(data.msg == "success")
            {
              this.isSuccess = true;
            }
            else
              {
                this.isNotSuccess = true;
              }          
        },
        error=>{
          console.log(error);
        }
      )      
      
      this.resetForm();
  }
 
  resetForm(){
    this.uploadForm.reset();
    this.submitted = false;    
  } 
 

}
