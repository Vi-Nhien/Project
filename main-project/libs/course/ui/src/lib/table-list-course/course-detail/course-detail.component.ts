import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  @Input() idGuild?: string;
  tabs = ['Thông tin', 'Bài giảng', 'Thiết lập'];
  constructor() { }

  ngOnInit() {
    console.log(this.idGuild);
  }

}
