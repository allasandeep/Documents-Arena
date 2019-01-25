import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule} from '@agm/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentDownloadComponent } from './document-download/document-download.component';
import { ROUTING } from './app.routing';
import { UsersService } from './shared/users.service';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentUploadComponent,
    DocumentDownloadComponent,  
    HeaderComponent, FooterComponent, LoginComponent, AdminComponent, RegisterComponent, ActivityComponent,    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ROUTING,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqARi_gp_pDonRIiArrCSYdJWIc5UQI7A',
      libraries: ["places"]
    }),
    BrowserAnimationsModule   
    
  ],
  providers: [UsersService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
