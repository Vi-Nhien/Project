import { Component } from '@angular/core';

@Component({
  selector: 'main-project-notify-header',
  templateUrl: './notify-header.component.html',
  styleUrls: ['./notify-header.component.css']
})
export class NotifyHeaderComponent  {

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
