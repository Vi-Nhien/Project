import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCourseComponent } from './header-course/header-course.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableListCourseComponent } from './table-list-course/table-list-course.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@NgModule({
  imports: [
    CommonModule,
    NzDropDownModule,
    NzTableModule,
    NzCheckboxModule
  ],
  declarations:[
    HeaderCourseComponent,
    TableListCourseComponent
  ],
  exports:[
    HeaderCourseComponent,
    TableListCourseComponent
  ],
})
export class CourseUiModule {}
