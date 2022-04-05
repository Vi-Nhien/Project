import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyListComponent } from './notify-list/notify-list.component';


import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzCheckboxModule,
    FormsModule,
    NzDropDownModule
  ],
  declarations: [
    NotifyListComponent
  ],
  exports: [
    NotifyListComponent
  ],
})
export class NotifyUiModule { }
