import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NotifyUiModule } from '@my-project/notify/ui';
import { FeatureTestComponent } from './feature-test/feature-test.component';
@NgModule({
  imports: [CommonModule, NotifyUiModule],
  declarations: [

    FeatureTestComponent
  ],
  exports: [

    FeatureTestComponent
  ],
})
export class NotifyFeatureModule {}
