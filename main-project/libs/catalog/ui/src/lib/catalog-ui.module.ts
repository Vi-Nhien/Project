import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogHeaderComponent } from './catalog-header/catalog-header.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { CatalogQuocgiaComponent } from './catalog-quocgia/catalog-quocgia.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CatalogTongiaoComponent } from './catalog-tongiao/catalog-tongiao.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NzMenuModule,
    NzTableModule,
    RouterModule
  ],

  declarations:[
    CatalogHeaderComponent,
    CatalogMenuComponent,
    CatalogQuocgiaComponent,
    CatalogTongiaoComponent
  ],

  exports:[
    CatalogHeaderComponent,
    CatalogMenuComponent,
    CatalogQuocgiaComponent,
    CatalogTongiaoComponent
  ]
})
export class CatalogUiModule {}
