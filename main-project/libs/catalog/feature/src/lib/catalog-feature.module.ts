import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuocGiaComponent } from './quoc-gia/quoc-gia.component';
import { RouterModule, Routes } from '@angular/router';
import { CatalogUiModule } from '@main-project/catalog/ui';


const routes : Routes =[
  {
    path: '', redirectTo: 'catalog/quoc-gia',    pathMatch: 'full'
  },
  {
    path: 'quoc-gia', component: QuocGiaComponent,

  }
]
@NgModule({
  imports: [
    CommonModule,
    CatalogUiModule,
    RouterModule.forChild(routes)
  ],
  declarations:[
    QuocGiaComponent,
    
  ],
  exports:[
    QuocGiaComponent
  ]
})
export class CatalogFeatureModule {}
