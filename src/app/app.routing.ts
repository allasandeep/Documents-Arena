import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentDownloadComponent } from './document-download/document-download.component';
import { ListComponent } from './list/list.component';

 
export const AppRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'documentUpload', component: DocumentUploadComponent },
    { path: 'documentDownload', component: DocumentDownloadComponent },
    { path: 'list', component: ListComponent},  
    
];
 
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
