import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifylistComponent } from './notifylist/notifylist.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NotifylistComponent
  ],
  exports: [
    NotifylistComponent
  ],
})
export class NotifyUiModule {}
