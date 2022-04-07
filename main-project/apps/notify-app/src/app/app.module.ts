

import { NotifyFeatureModule } from '@main-project/notify/feature';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule, Routes } from '@angular/router';
;

const routes: Routes = [
  {
    path: 'notify',
    loadChildren: async() => (await import('@main-project/notify/feature')).NotifyFeatureModule
  }
];


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NzButtonModule, NotifyFeatureModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent,RouterModule],
})
export class AppModule {}
