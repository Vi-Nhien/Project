
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzResultModule
  ],
  declarations: [
    LoginComponent
  ],

  exports:[
  ]
})
export class LoginFeatureModule {}
