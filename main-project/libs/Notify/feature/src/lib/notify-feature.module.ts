
import { NotifyUiModule } from '@main-project/notify/ui';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyAllComponent } from './notify-all/notify-all.component';
import { NotifySettingComponent } from './notify-setting/notify-setting.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',   redirectTo: '/page', pathMatch: 'full'
  },
  {
    path: 'page', component: NotifyAllComponent
  },
  {
    path : 'tb-tc', component: NotifySettingComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    NotifyUiModule,
    RouterModule.forChild(routes)
  ],


  declarations: [
    NotifyAllComponent,
    NotifySettingComponent,
  ],

   exports: [
    NotifyAllComponent,
    NotifySettingComponent,

   ]
})
export class NotifyFeatureModule {}

