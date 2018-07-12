import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { ListComponent } from './list/list.component';

 
export const AppRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'documentUpload', component: DocumentUploadComponent },
    { path: 'documentDownload', component: DocumentUploadComponent },
    {path:'list', component: ListComponent},
    {path:'createUpdate' , component: CreateUpdateComponent},
    
];
 
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
