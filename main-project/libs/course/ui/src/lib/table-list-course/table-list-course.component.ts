import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KhoaHoc, List } from '@main-project/course/data-access/models';
import { CourseService } from '@main-project/course/data-access/services';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@Component({
  selector: 'app-table-list-course',
  templateUrl: './table-list-course.component.html',
  styleUrls: ['./table-list-course.component.scss']
})
export class TableListCourseComponent implements OnInit {
  idGuild ?: string;
  errorMessage : any;
  listCourse: any = [];
  loading = true;
  constructor(
    private drawerService: NzDrawerService,
    private router: Router,
    private courseServices: CourseService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.getKhoaHocList()
  }

  getKhoaHocList() {
    const pageList: List = {
      keyword: "",
      pageNumber: 1,
      pageSize: 20,
      sortASC: false,
      sortName: "id",
    }
    const myObserver = {
      next: (x: any) => {
        this.listCourse = x.result;
        this.loading = false;
      },
      error: (err: Error) => {
        // console.error('Observer got an error: ');
        this.errorMessage = err;
        this.loading = false;
        throw err
      },
    };
    this.courseServices.getKhoaHocList(pageList).subscribe(myObserver);

  }

  courseDetail(id: string){
    if(id){
      this.idGuild = id;
      return
    }
  }
  addCourse() {
    this.modal.create({
      nzTitle: "add",
      nzContent: 'tplContent',
      nzFooter: 'tplFooter',
      nzComponentParams: {
        value: 'Template Context'
      },
      nzOnOk: () => console.log('Click ok')
    });
  }
  routerHome(){
    this.router.navigate(['/'])
  }
}
