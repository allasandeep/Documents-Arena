import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentDownloadComponent } from './document-download/document-download.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ActivityComponent } from "./activity/activity.component";

export const AppRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'documentUpload', component: DocumentUploadComponent, canActivate: [AuthGuard] },
    { path: 'documentDownload', component: DocumentDownloadComponent, canActivate: [AuthGuard] },
    { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },    
    { path: 'register', component: RegisterComponent }
    
];
 
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
