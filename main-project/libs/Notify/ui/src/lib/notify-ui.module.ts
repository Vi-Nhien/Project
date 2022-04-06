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
    NzSelectModule

  ],
  declarations: [
    NotifyListComponent,
    NotifyHeaderComponent,
    SidebarComponent,
  ],
  exports: [
    NotifyListComponent,
    NotifyHeaderComponent,
    SidebarComponent,
  ],

  providers: [{ provide: NzMessageService }]
})
export class NotifyUiModule { }
