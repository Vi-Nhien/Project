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
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.Kyg6EEO24x82NHsjCKb-bQG0R7k7RfMloCb2A0XiJHeApN-6-jgj_BUHPg8MDtoRKnIxFz93lp-22lFMtiU63qopnm0bBcXT3Vr8X4wYdW177Y-Q4E_j3oUR3J6_PtaOvOBxsx9i1BZP3Vtu9s5zX307TLsU_DryFVbish4HehgdW2smmYNvo0Nf_qUnrRwbzNs4aPcpmaNO0s8ocEpFs5kQskaHVIADHqZ3RGuOS74fDvv_8vhAed1HeG5DVCMZja1vFeLlJ7Jn2bI0l-LHQ-Ejtk0mmcJyDcmLZnyEtd4xNUVZb4_HuKpMhnpRXXOwoGk6KjvBPYlx2-NigSMQ2g.qKYp6FCf28WZl9YbLmgXgw.PHcq4eAGIK-ctwq4Qsv-40XTJszLC1FVan1bcfQT-GaKrcQ_oVKl3OHyvLY_xCnZZUxkLPYWmHVc-gCYycioIv2c7M56ZvGR9aSr3aYr9yqAiBGL49-w7Y44XBYAoNBmM8OUqibmsy_ZZQG29F1HauKFihEcYr5JfGk2rE95Pj3ul7j9K0iljrGKnjfZqBkL6zwO-8nN8Um0pGYo4HX3r1AmM-E-5J2LCa1GOAc4dH64FvIOzEKE1V5SLMGMsyJHQ3Q2wy4oa_UWrEOmDNl3tQfcNqI-E9Z6wYGkHt_m4fyoZKMRd5XMxaOekGHmN7sTbYEZASY7wyENHyzumEh31V7HlGeqUgMO5jfVOcxPx_dN1iTwD_LnzF9FDExKSZuTcUGvVISn-xhoD0olYNDCmRmbyd7q4ZIaZ4-vObOgk596ocBpRqec3RPbAvypvXfFtuFZcGIt3vB9VhFuzGJdRqdNEjbRo0OXGUCUtB6BrjTZPkMkNqQTh7U_9vnDs89YGlQ0eHyZabN7bOl3x2eDnXG3TUoFR3A9RzGDkDG-cQqFJMTjCbea1DpTiuT9TEH7HAba5siFjrvKWhAMLQCFAe8T4ThgY7aMbUR8HOTCc1ekujkCtTyCgSrELkyP1tKEXOBv9lJ2zvE1qYHG2xjanl03zzJd4U5GFGDkBtCwjU_UXaz9VA44dvdou3Zv7-zR0srmhQb8HabpakYVM3NX1yS0PJu91ic-Z-hXZoyiUwgSUkVuzCfkGcxSM_cf_PQD1jIrt758aBUdSsExn-q5W_Z770KSYdq7DdURR8cBfX_zpgBfVenMbC9ykhpJyNssUbwVcUl2vezqcv_qmWQw2KD4a0VqD41OCoCxPIq5BJLWcUa8stYTRqIxCtnhyYppQxfev1R52bPreoj_V9U9rqFaV-MDAyT4T54UkOWTxsoj07MylDtBP4nslkTo1tDCHDlT1yBe073g7DBn3jNAlg0vvxaoWbS24O0ZMywYosVSYJVBr6JeePOqE_EO-gFSwLLGVR-NbdvDZCwYWdPLIaQbPFL5-A3TBvqQcK_lH6fZ0WMtT72yeKKAlMwefTHpIH4OPpCYMQ4nA6WnYrJ0B-RQTdJuzqwQJum9vom4RzJbIzXo4jdAzq2TfaEOufzXka9kC9nH3qG7YGvkmJGdu-JVYHHuYrCM1M7-q5rCYSczU6MElePKxUn1qBkQKHI2L75199OzxFDEA8efOc5A2ONu-MqBwvO-jFDEjYiCXK026O_Cs4R_2aizcuyhVxGakQf6jUjDykDwbZlcN7DFYYNo-QXQ6wx5mVniJZ-W6kgmFkSGfOxSeH8BApUpOxJmSnM-k5KF7am6uQGFMrXbkqMNPXv4GUAVTX1GhSkSmI0kxhPpttj6on_s-9ABfbb-7usymFECGwELWyGaBdchaSqpitkPGMenF6yGrJs6d_REaOnULAWm2s6yZFvQbMzAPPPsNQTBAwDNU2W7J2IBx1ZL_LFuLwRiD_VJnpnJ3fARC2L-9C_AmqdREmyhHk7ojt42K2bPu70K_BsHKxcdtvmRKJzCHRQUKCUSZKlK7K42s-dkG-9Ap9iE9tx6plsA4-tiwve6TchML8qCo8xbqXnjbCrh5g4Qn3ikUMO2y1_PZaTyCyZ9a7rgSpU_zFxWUajrVGGdkkkOmhyX8b9Cew.KGxQ_Cxf4v1fIrfahtdsYEYj2TLeJsqirx-zh5236cs'

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
