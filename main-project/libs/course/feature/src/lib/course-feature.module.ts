import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachKhoaHocComponent } from './danh-sach-khoa-hoc/danh-sach-khoa-hoc.component';
import { CourseUiModule } from '@main-project/course/ui'


const routes: Routes = [
  {
    path: '', redirectTo: 'course/danh-sach-khoa-hoc', pathMatch: 'full'
  },
  {
    path: 'danh-sach-khoa-hoc', component: DanhSachKhoaHocComponent,
  },
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CourseUiModule
  ],
  declarations:[
    DanhSachKhoaHocComponent
  ],
  exports:[
    DanhSachKhoaHocComponent],
})
export class CourseFeatureModule { }
