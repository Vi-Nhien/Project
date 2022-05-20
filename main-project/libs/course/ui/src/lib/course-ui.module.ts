import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCourseComponent } from './header-course/header-course.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableListCourseComponent } from './table-list-course/table-list-course.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { CourseDetailComponent } from './table-list-course/course-detail/course-detail.component';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@NgModule({
  imports: [
    CommonModule,
    NzDropDownModule,
    NzTableModule,
    NzCheckboxModule,
    NzSkeletonModule,
    NzSpinModule,
    NzIconModule,
    NzResizableModule,
    NzPipesModule,
    NzModalModule,
    NzResultModule,
    NzDrawerModule,
    NzTabsModule,
    NzMenuModule

  ],
  declarations:[
    HeaderCourseComponent,
    TableListCourseComponent,
    CourseDetailComponent
  ],
  exports:[
    HeaderCourseComponent,
    TableListCourseComponent,
    CourseDetailComponent
  ],
})
export class CourseUiModule {}
