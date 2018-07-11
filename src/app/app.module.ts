import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule} from '@agm/core';
import { DataService} from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentDownloadComponent } from './document-download/document-download.component';
import { ROUTING } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentUploadComponent,
    DocumentDownloadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ROUTING,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqARi_gp_pDonRIiArrCSYdJWIc5UQI7A',
      libraries: ["places"]
    })   
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
