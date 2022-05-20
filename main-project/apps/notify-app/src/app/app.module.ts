import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './error.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ServiceInterceptor } from './service-interceptor'

import { RouterModule, Routes } from '@angular/router';

import { NzI18nModule, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: async () => await import('@main-project/login/feature').then(login => login.LoginFeatureModule)
  },
  {
    path: 'notify',
    loadChildren: async () => await import('@main-project/notify/feature').then(notify => notify.NotifyFeatureModule)
  },
  {
    path: 'catalog',
    loadChildren: async () =>await import ('@main-project/catalog/feature').then(catalog => catalog.CatalogFeatureModule)
  },
  {
    path: 'task',
    loadChildren: async () => await import ('@main-project/task/feature').then(task => task.TaskFeatureModule)
  },
  {
    path : 'course',
    loadChildren : async () => await import ('@main-project/course/feature').then(course => course.CourseFeatureModule)
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
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true
    },
    {
      provide: NZ_I18N, useValue: vi_VN
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
