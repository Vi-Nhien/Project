import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  @Input() id ?: string;
  constructor() { }

  ngOnInit() {
  }

}
