import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {UsersService} from '../shared/users.service';
import { DocumentData } from '../documentData';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-document-download',
  templateUrl: './document-download.component.html',
  styleUrls: ['./document-download.component.css']
})
export class DocumentDownloadComponent implements OnInit {

  private documentsFound: Array<DocumentData>;
  @ViewChild('search') public searchElement: ElementRef;
  
  constructor(private mapsAPILoader: MapsAPILoader, private usersService:UsersService, private ngZone: NgZone) {
    this.documentsFound = [];
  }
  
  ngOnInit() {
      this.mapsAPILoader.load().then(
            () => {
                  let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });
                  autocomplete.addListener("place_changed", () => {
                            this.ngZone.run(() => {
                            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                            if(place.geometry === undefined || place.geometry === null )
                            {
                              return;
                            }
                        });
                    });
                });                
  }

  searchDocument(streetAddress){
    let address, street, city, state, country;
    
    if(streetAddress != null)
    {
      address = streetAddress.split(","); 
      street = address[0];
      city = address[1].trim();
      state = address[2].trim();
      country = address[3].trim();
    }
    //console.log(street + "-" + city + "-" + state + "-" + country);
    this.usersService.readUsers().subscribe(
      data=>{
        data.forEach(element => {
           if(element.fileAddress == street && element.fileCity == city && element.fileState == state && element.fileCountry == country)
            {
              this.documentsFound.push(element);
            }
        });
        console.log(data);          
      },
      error=>{
        console.log(error);
      }
    )
  }

  downloadFile(documentPath){
    let dPath = documentPath.split("\\");
    let filename = dPath[1];
    //console.log(filename);    
    this.usersService.downloadFile(filename).subscribe(
      data=>{       
       saveAs(data,filename);      
      },
      error=>{
        console.log(error);
      }
    )
  }

}
