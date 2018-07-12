import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule} from '@agm/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentDownloadComponent } from './document-download/document-download.component';
import { ListComponent } from './list/list.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { ROUTING } from './app.routing';
import { UsersService } from './shared/users.service';
import {HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentUploadComponent,
    DocumentDownloadComponent,
    CreateUpdateComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ROUTING,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqARi_gp_pDonRIiArrCSYdJWIc5UQI7A',
      libraries: ["places"]
    })   
    
  ],
  providers: [ UsersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
