
import { NotifyFeatureModule } from '@main-project/notify/feature';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {NotifyUiModule} from '@main-project/notify/ui'

import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NotifyUiModule, NzButtonModule, NotifyFeatureModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
