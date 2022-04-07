
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
    path : 'tb-tinh-chat', component: NotifySettingComponent
  }
];

@NgModule({
  imports: [CommonModule, NotifyUiModule,
    RouterModule.forRoot(routes)],
  declarations: [
    NotifyAllComponent,
    NotifySettingComponent,
  ],

   exports: [
    NotifyAllComponent,
    NotifySettingComponent,
    RouterModule
   ]
})
export class NotifyFeatureModule {}

