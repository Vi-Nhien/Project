import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogHeaderComponent } from './catalog-header/catalog-header.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { CatalogQuocgiaComponent } from './catalog-quocgia/catalog-quocgia.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CatalogTongiaoComponent } from './catalog-tongiao/catalog-tongiao.component';
import { RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogDantocComponent } from './catalog-dantoc/catalog-dantoc.component';

@NgModule({
  imports: [
    CommonModule,
    NzMenuModule,
    NzTableModule,
    RouterModule,
    NzModalModule,
    NzDropDownModule,
    NzInputNumberModule,
    NzInputModule,
    NzCheckboxModule,
    NzNotificationModule,
    FormsModule,
    ReactiveFormsModule
  ],

  declarations:[
    CatalogHeaderComponent,
    CatalogMenuComponent,
    CatalogQuocgiaComponent,
    CatalogTongiaoComponent,
    CatalogDantocComponent
  ],

  exports:[
    CatalogHeaderComponent,
    CatalogMenuComponent,
    CatalogQuocgiaComponent,
    CatalogTongiaoComponent,
    CatalogDantocComponent
  ]
})
export class CatalogUiModule {}
