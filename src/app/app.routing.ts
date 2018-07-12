import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';

 
export const AppRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'documentUpload', component: DocumentUploadComponent },
    { path: 'documentDownload', component: DocumentUploadComponent }
    
];
 
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
