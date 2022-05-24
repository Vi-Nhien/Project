import { Component, Input, OnInit } from '@angular/core';
import { QuillConfiguration } from './quill-configuration';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-information-course',
  templateUrl: './information-course.component.html',
  styleUrls: ['./information-course.component.scss']
})
export class InformationCourseComponent implements OnInit {
  quillConfiguration = QuillConfiguration;
  KH_BaoGoms = [{}];
  @Input() idGuild?: string;
  constructor() { }

  ngOnInit() {
    console.log(this.idGuild);

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
  drop(event: any) {
    moveItemInArray(this.KH_BaoGoms, event.previousIndex, event.currentIndex);
  }
}
