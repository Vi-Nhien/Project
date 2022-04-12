import { HttpClientModule } from '@angular/common/http';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


import { RouterModule, Routes } from '@angular/router';

import { NzI18nModule, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
;

const routes: Routes = [
  {
    path: '', redirectTo:'/login', pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren:  async () => await import('@main-project/login/feature').then(login => login.LoginFeatureModule)
  },
  {
    path: 'notify',
    loadChildren: async () => await import('@main-project/notify/feature').then(notify => notify.NotifyFeatureModule)
  }

];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NzI18nModule,
    HttpClientModule
  ],

  providers: [    { provide: NZ_I18N, useValue: vi_VN },],
  bootstrap: [AppComponent],
})
export class AppModule {}
