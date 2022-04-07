import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotifyListComponent } from './notify-list/notify-list.component';


import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NotifyModalComponent } from './notify-modal/notify-modal.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzDividerModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzPaginationModule,
    NzRadioModule,
    NzUploadModule




  ],
  declarations: [
    NotifyListComponent,
    NotifyHeaderComponent,
    SidebarComponent,
    NotifyPropertyComponent,
    NotifyModalComponent,
  ],
  exports: [
    NotifyListComponent,
    NotifyHeaderComponent,
    SidebarComponent,
    NotifyPropertyComponent,
    NotifyModalComponent
  ],

  providers: [{ provide: NzMessageService }]
})
export class NotifyUiModule { }
