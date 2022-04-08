import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


import { RouterModule, Routes } from '@angular/router';

;

const routes: Routes = [
  {
    path: '', redirectTo:'/login', pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren: () => import('@main-project/login/feature').then(login => login.LoginFeatureModule)
  },
  {
    path: 'notify',
    loadChildren: () => import('@main-project/notify/feature').then(notify => notify.NotifyFeatureModule)
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [],
  bootstrap: [AppComponent,RouterModule],
})
export class AppModule {}
