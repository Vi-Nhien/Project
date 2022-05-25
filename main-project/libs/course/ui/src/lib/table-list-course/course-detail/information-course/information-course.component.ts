import { Component, Input, OnInit } from '@angular/core';
import { QuillConfiguration } from './quill-configuration';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CourseService } from '@main-project/course/data-access/services';
import { List } from '@main-project/course/data-access/models';
@Component({
  selector: 'app-information-course',
  templateUrl: './information-course.component.html',
  styleUrls: ['./information-course.component.scss']
})
export class InformationCourseComponent implements OnInit {
  quillConfiguration = QuillConfiguration;
  KH_BaoGoms: any = [];
  @Input() idGuild?: string;
  loading= true;
  constructor(
    private courseServices: CourseService
  ) { }

  ngOnInit() {
    this.getKhoaHocList()

  }
  getKhoaHocList() {
    const KHRequest: List = {
      isVisible: true,
      pageNumber: 0,
      pageSize: 0,
    }
    this.courseServices.getKhoaHocList(KHRequest).subscribe({
      next: (x: any)=>{ console.log(x)},
      error: (err: Error) => {console.error(err)},
      complete: ()=> {
      console.log('complete'),
      this.loading=false
      }
    });
  }
  delete(index: any) {
    this.KH_BaoGoms.splice(index, 1);
  }

  addNew() {
    this.KH_BaoGoms.push({});
  }
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  // }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.KH_BaoGoms, event.previousIndex, event.currentIndex);
  }
}
