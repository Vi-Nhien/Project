import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotifyListComponent } from './notify-list/notify-list.component';


import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NotifyHeaderComponent } from './notify-header/notify-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NotifyPropertyComponent } from './notify-property/notify-property.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NotifyModalComponent } from './notify-modal/notify-modal.component';
import { PropertyModalComponent } from './property-modal/property-modal.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NotifyAddModalComponent } from './notify-add-modal/notify-add-modal.component';
import { PropertyAddModalComponent } from './property-add-modal/property-add-modal.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NotifyDetailComponent } from './notify-detail/notify-detail.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzI18nModule, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { NoSanitizePipe  } from '@main-project/notify/data-access/services'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzDividerModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzModalModule,
    NzFormModule,
    AngularEditorModule,
    HttpClientModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzPaginationModule,
    NzRadioModule,
    NzUploadModule,
    NzInputNumberModule,
    RouterModule,
    NzDrawerModule,
    NzProgressModule,
    NzI18nModule,

  ],
  declarations: [
    NotifyListComponent,
    NotifyHeaderComponent,
    SidebarComponent,
    NotifyPropertyComponent,
    NotifyModalComponent,
    PropertyModalComponent,
    NotifyAddModalComponent,
    PropertyAddModalComponent,
    NotifyDetailComponent,
    NoSanitizePipe
  ],
  exports: [
    NotifyListComponent,
    NotifyHeaderComponent,
    SidebarComponent,
    NotifyPropertyComponent,
    NotifyModalComponent,
    PropertyModalComponent,
    NotifyAddModalComponent,
    NotifyDetailComponent
  ],

  providers: [
    { provide: NzMessageService },
    { provide: NZ_I18N, useValue: vi_VN }]
})
export class NotifyUiModule { }
