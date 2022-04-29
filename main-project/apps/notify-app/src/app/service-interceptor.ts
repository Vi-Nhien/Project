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
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.iq4K7Sh7FpYJ3IfVvCA4kkbXTAYT89gGlOjFtDVuVO79218sql-WBUa5kfgFZIvo5nIjV6NE6qMycqhe2M432RqS6yvm2fiup24qYPYgsQZdFRqIo_lz2fkGqXsEngArq_gATGO5PzjrcBNrcAUvjMp5f7TGavED8vJEr1IGBrTGWiuT9XgOVlY6gtIOUO8dQnwSaLIRgehFWSTfFAaT1zZJR7hd_8lGnJuJHcWm7Ph942N_mB1JLBRNQtoQbOpjN8kMgHHQDGtfp1mhUP8zXNBKrKDurZD3ybLx08Z8x2lqernfVNrgohTZHQYzCRA8HY10NVInAt-CiC6HeLUaiA.H09Aebiglh8YwI4ssuZrIA.6F9dgws9r0MAq-fPuldWFw1-O9qIYliVZQXKseZlgN-ilbybbW8iOVRdSoND0lgwbk_8KekymbGafI1_DI2Uv_godz-2Z_y-UXfZp_k8RtSCqpTkuDUNZV3gs9yIH-u1JeuW7ukzp0eZEXot8KrAv-eg5W23RBz3M-1qYDOQWgY5IcbgAKRIva_EQo6-3GCCXaLWr3hRz82uQNy6CkaYaZ34BXtEQl9g1gJ5SVVAzxR4TRR1Ox4RNP9zOVTSQr9pum2tQZO3QI1-kvwSS6xVJVYQ2vWgQARVCMsC5TevD-5wQPtCKI2rD0jWxSCGX5__5S8ligrf4aywzHKyZNJUrvhre_rsGMKlikrdcBvBloD5i6zCMvcvOjxxqwi3Nj1epcKeGIk96RRlWPSU9nwje29W2LNWKbYYBtCSJ3bdJ2U9-o9QwKAfM9BJD46VtXfr9YHcVo8i7NI0kuWGr0L3yX5FGJeRujTExpnitxKp2X1rvYbzpkYDoBWT5y8gosicQyckHAFyjiyAVg1nFulTwSzzy9MGDCeNX0rki2iJ_d_BHb5S6dB5dAKZcdg-eQrcPTiOxp9BUxEKPEPKRf1vynhVhbg1zo6VfvLE9au6hf0FIF9PVEc_KRcc-3OJMA4_wB7Zm5sao1qL00qnFZ4bIRm_AhuOSYGk7cqCph1CvvWxrMmZS_hofqslRu2FaaZaeNAtk335Vc4h2N-yLQgvp3e5TRr3LvSGELM3EmarzsHMpKzTwshLA-QAaeATv9abHddu7XBlHMp8ruJC5nQIf-4TkZfKzHiQDMkPekB2eZAT32hKW5Br0mcHl-_WEpeSGeOJ4V1S0R_huZ3YLtQt9YKRRUHQsbL06aEON6wjfCYNpyfsCwIrDcZYk6YKBwOnR3PEXEp-6xyjDdPDNSB-jiKcjKBoUxHezkES6Y0445GBstODE8kbJoaw9LhIbb3NIxW9Y5Och_M4mhdWEIh2JQ8BnazgO_pf3i39xZYD8MQv7fbm_G3NDNHqkg918rJySVLzB37m1F9q1I_Km86LMILYrNcJeW7x5hJIMirHCEzdq9OuEiNFc3lqq8pz94a3PxSoAZUCHFhqKCkRp-2u04E_alUJPfMUDTE6Hj71LuORg7HrK5PAxg9AQL4TGA0bcYArjVjn9xpu9CPHAaQCOLom29nRsuVlOzVKIgTaAOSDXbQ-0JPRcZAQMcuVKs6U8bkUx2ybJ5q6iJIJTJK2LmBtlhDqoIPSR6y3ou1P_J0jGBKP2HtfspJpSL_LvVaMC1n3LTBl3iqMTn8pMivvjFkqJ33EfOykyevMks9vO3ZL3Mgee0zZVLOnpgYwscHWza83U657VDhtP4AEXeaSnTxd7sPxbnWx9wYwaS7YiAV-NHgfWWkRE6N6iErEOVPqcrKqOA-UvoyR49BVbBdXsvnXj6vReZ7mfJSgrs-wVr1B6LHNd_kJMlL5Mvl2AP9hgp3P9niQsGUulo566Is18ixNRyYsPujhxvN0gXta0b8.LldRKosvLYuqMRWMiUeVhUYBRPfCmeseRDvsOKVj0F0'

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
