import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogHeaderComponent } from './catalog-header/catalog-header.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { CatalogQuocgiaComponent } from './catalog-quocgia/catalog-quocgia.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  imports: [
    CommonModule,
    NzMenuModule,
    NzTableModule
  ],

  declarations:[
    CatalogHeaderComponent,
    CatalogMenuComponent,
    CatalogQuocgiaComponent
  ],

  exports:[
    CatalogHeaderComponent,
    CatalogMenuComponent,
    CatalogQuocgiaComponent
  ]
})
export class CatalogUiModule {}
