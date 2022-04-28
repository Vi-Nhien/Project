import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuocGiaComponent } from './quoc-gia/quoc-gia.component';
import { RouterModule, Routes } from '@angular/router';
import { CatalogUiModule } from '@main-project/catalog/ui';
import { TonGiaoComponent } from './ton-giao/ton-giao.component';
import { DanTocComponent } from './dan-toc/quoc-gia.component';


const routes : Routes =[
  {
    path: '', redirectTo: 'catalog/quoc-gia',    pathMatch: 'full'
  },
  {
    path: 'quoc-gia', component: QuocGiaComponent,
  },
  {
    path: 'ton-giao', component: TonGiaoComponent
  },
  {
    path: 'dan-toc', component: DanTocComponent
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
    TonGiaoComponent,
    DanTocComponent
  ],
  exports:[
    QuocGiaComponent,
    TonGiaoComponent,
    DanTocComponent
  ]
})
export class CatalogFeatureModule {}
