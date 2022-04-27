
import { NotifyUiModule } from '@main-project/notify/ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyAllComponent } from './notify-all/notify-all.component';

import { RouterModule, Routes } from '@angular/router';
import { NotifySettingComponent } from './notify-setting/notify-setting.component';
import { NotifyDetailingComponent } from './notify-detailing/notify-detailing.component';

const routes: Routes = [
  {
    path: '',   redirectTo: '/notify/page', pathMatch: 'full'
  },
  {
    path: 'page', component: NotifyAllComponent
  },
  {
    path: 'page/:id' , component: NotifyDetailingComponent
  },
  {
    path : 'tb-tc', component: NotifySettingComponent
  },
  {
    path: 'star', component: NotifyAllComponent
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
    NotifyDetailingComponent


  ],

   exports: [
    NotifyAllComponent,
    NotifySettingComponent,
    NotifyDetailingComponent
   ]
})
export class NotifyFeatureModule {}

