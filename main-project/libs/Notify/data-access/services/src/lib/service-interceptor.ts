import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  auth_token =
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.ECebrv68HcYy0TImr8u5wIj_V8vw8736AqFI7GW3tju8AmGLn-Ycl-1d6f4GBHX1r0qjNF4lw50ZQsRSiBpluFDkm2gLYWcyuSIUdLEsw6G0aICgnPCycuvKDxctFMMAZfaQtkxeZ4JgukS1a-m698WDkhZBWFiG2aZwkd4P3H9UzSfaS9uSDOKURdmlJt5MThfiYgl0g9GcenSvTokcNVfntFLnm54z2cqKUV2xJCCK8_E6YaF_IXaRcGO-OAmrI16DtjEgNSEUDb4oyN543uzksAnOCiUISLy-YXVo-QvwEU8kMcjd8zahtQ_LR9wJsBFk59CO3GFdTsjerlPWnQ.7ily3H_2jwqIG8dK37ahYw.iptVIntWVKl1xCWwtqKGwZuaqn2iuo61jOahiIKNYrmB65rVEWaHo0Zg6zPi3YCYjG7lJZ75-cBO672q_5ig2ChjlURzcokgg3xDZdRJFi4E-iSjTPZbDz5t-wcekxtwFSjeajlkATAzRT6Jmx11fI0P3qzZ7p-MuteUBkftosx_SP38RArqbFtF9Z-wno4gypXfiTw-8ZtvjVqlB6K3wvXroYIRMg0De88fCki7vIUJdbMK8yNZiGDThcIBHpTB-7zKSOLYULo7VWzB1tk20Uy-2cWsPD1toD_RnPEqpJfbWb1mYU7LJtj4ziIneGOFrrk0zmUoxX-ibaylApJxjGMMQaoUODuDQ4D55t0hB6ucWKBQBpNVPOUTGXgnUINmaJOUt3az20jFb7MLvK7dTwmJVXFwR0KLtcFSJ-HgSHHTqXuWfMrkfLNt7IKJ49UGOdbTQ6OiGqO-q66kERKMVDvyVTv3PbFiluOWYNDKMPhADDgvWHTjZcqH-Lvs-aJfKBEyPIdPyRypft-zMawk-MOrgl6Sf7K287jjGtpB2Gj6GKVVEyAFYCrRCvrJ212XpkLI82FQhDr9_bLtdcnmW2AnMhXGNBANpqwQzlhFDyaenzml2JOauG6dygS9xEu8txU_yLi-9uIhuGvBu6Y9g9LJI6R0HVbyghHRcqQ4brQSFEPh9jQ-r8nc6IsNVoI7dDAsOtfOBX0V8MC0ZliZYZErhBW0acIu5lKmsl5PEgVWB6JyC-7rI40xebS-lmwoJzgiUeNt_6AVM2_aUm-2IJNQn6b3_yRMtwlz-OV_pmVxZg2SXLwhM_TDe0JYrYQHe76Z-AgKmMMVAa8S0Mg4J4a8-ZcIO-wtKFC9ExiaBXmWb3oSRlxV0tD_ud5kyiZjTtNZ1bQI9GAfgURyQs-Gtp4YYs3H6-VOd32k15ZChxTHKGpl81b_zSqCxaJJtEs7Pdz3LVVCcq7hH6hAKjWcI0VieI_Lr5kVdDfCjbOSqTLWYvmNk4N96E4GFd15Zd5ZJeCemPa9vRema2xibQpjUHsyC-4cLzPUiO5_Jx9vkWcOD_luNjSn8idDnjF01hkbbu6N_rxLc1Qhc6z86z4ZBadstOUgzJ8rmgtuiZ5PdiD_1QPDmIt9inxuvFpioCKLj1mPJ1bbS32Z6h5L9hOAtUJOexzk_djbaP58wOOIQt3ZkFrEtkLVy0Y7Rdt6uiHgagaIHJ7knB6LgNcsBgxJcSxoVE50UPtXahzWGAD8A9Tb9BJPZ-AhYrB8G1hWQdsTD1bvd8zFFwRLqoBwpapP4aWll32nOJvzd2pdfiTBPCVK4Dq1WUQGrI77Vd5PTkS8xVak7OPLaouCgIDxMFN7RLZ-ldiRS5s51uQ-OocbuijveLAsV79ptbO04Ro2WLA1j21VHoal0CcSDgUvAMXfShCXzHn-hmiF7oCPdpZey3zFpyvL99Eug1lpWuRwOn1p-5a8NfJaqMAqXHjolk9lnLi1bHlqUzCBlFgBZcY_MOg.zUlNoM3PEIS4IQhNgckROpnc8fkpZndt0XtOGopdbM0'

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {


      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.auth_token}
` },
      });


    return next.handle(req).pipe(s => this.handleErrors(s, req.url));
  }
  private handleErrors(
    source: Observable<HttpEvent<unknown>>,
    urlPath: string
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !urlPath.includes('/auth/')) {
          return this.handle401();
        }

        // rethrow error
        return throwError(() => error);
      })
    );
  }

  private handle401() {
    return EMPTY;
  }
}
