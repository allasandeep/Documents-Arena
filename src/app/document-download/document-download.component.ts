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
  private notFoundIsVisible: Boolean;
  private documentCardIsVisible: Boolean;
  @ViewChild('search') public searchElement: ElementRef;

  zipCode: string;

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
                
      this.notFoundIsVisible = false;
      this.documentCardIsVisible = false;
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
    this.usersService.readDocuments().subscribe(
      data=>{
        this.documentsFound = [];
        data.forEach(element => {
           if(element.fileAddress == street && element.fileCity == city && element.fileState == state && element.fileCountry == country)
            {
              this.documentsFound.push(element);
            }           
        });
        
        if(this.documentsFound.length > 0)
        {
            this.documentCardIsVisible = true;
            this.notFoundIsVisible = false;
        }
        else
        {
            this.documentCardIsVisible = false;
            this.notFoundIsVisible = true;
        }                  
      },
      error=>{
        console.log(error);
      }
    )
  }  

  openCheckout(Price, fPath, fName) {
    let fPrice = Price * 100;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_RHfdi105HoxX8hLBKuDuCs8p',
      locale: 'auto',
      zipCode: true,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      billingAddress: true,
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.        
        this.usersService.charge(token, fPrice, fName).subscribe(
          data=>{       
           console.log(data);      
           if(data.msg == "success")
            {
              this.downloadFile(fPath, fName);
            }
            else {
              
            }
          },
          error=>{
            console.log(error);
          }
        ) 
      }
    });

    handler.open({
      name: 'Payment',
      description: fName,
      amount: fPrice
    });

  }

  downloadFile(documentPath, fName){
    let dPath = documentPath.split("\\");
    let filename = dPath[1];
    //console.log(filename);    
    this.usersService.downloadFile(filename).subscribe(
      data=>{      
        let documentSeenName = fName + "-" + filename; 
       saveAs(data, documentSeenName);      
      },
      error=>{
        console.log(error);
      }
    )
  }

}
