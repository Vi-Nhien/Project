
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NotifyUiModule } from '@my-project/notify/ui'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NotifyUiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
