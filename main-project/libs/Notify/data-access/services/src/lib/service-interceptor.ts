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
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.K17JlMAk9mEsqizZfRhgtsN-jegKnPggShwUAZbOtDwddXnNSbdc_kXalkKHAGcQIugWT6vPc49wDdhEAvBmauwUKfL3RjRRAZhV5xbbvdPUpkPJootorALUA6f86GtKXcIMwN1z_gGaFA-JFCRRGxsiPCYvfWlJOgpfqXzgm62h6VbX3uII65uodW0WWQ8TPY3psENEyfozcnvH0Lsw74n499L_HkRrv6NZRjmmQDJP7oPqP2IxYlV3Azrmbr7RbtnDlhBMX44UI7emUvk6zAfUgRNYRPs6K1X7IqQ1zSlxf2PqjozKoeLoRY2vayFWGvJDgIiJ9Bo0sUdflGdlbg.6D7Ph6pjD07whlHafjtLBg.BrJLIcO2ApfzJCngpAsk6KwciJEOprUJ7nJ9VU-bDDMhfrZcZxAn9MtikAJn0Z2-lfIQWeNhNNy9u2eVPeFwP2xsStG9I6vuvAgggUELth0FhTm5RhVEei_D5pgV3CHY-tk5bOS9q5DEQehbjTk28y9odi8XvqiI0SlruERu_NOhyLkUeFxVICjvux7XGBDuBI2TDHHUWaMUy43iLUX_BkV53Cf7CAZnyBo9Sfe-STlLrBdKIXSqwW7S3Dr3lUOZ2nV_v3pSvOxRt9hsU01KDVAy0TKzYfY2bM72LCe7sp1_hEoS-F-GsI4i5sHprWEqPC6HLHOQB_ZUyXetqWhGL9a4fKVbvp6xaLtrbxDvXj2y3a64j8lhOVfdyJg57oUecUfiIUTk_-Ko5SzM1RJDcgYpfnJEZuOrArpiZvIAWeezK_5PUDQ1fOT9TuwO5Y2QyT-veK7pKY4ZjCmvteSumVB3PfCd1M-Z9P1D8aybrOKiW9Zd4BFOdYamqj3dCXKyvfj5h_iUuDG_bLB3ypBKoThligo9BjrGKAAJchaADOWgLkcAZlb2aELJhwZAY73pE3aoKvvezwtOqQE0GZxux37C7umzbi56VVeDV8sATWFFCdG3HIjGCMdPOD0e4YbLRxjQDlXa4rPn-jsxZkSCldmnCzI27kn1iEW49lK8GslVJiae7IbpwYCI0q5zajKNhohnDk9y1KJ5dR-IpO6XeUvrJKFc28q1w2QJqlE2pLHZmoSag5GIg1lufLoYOXG4L22iDGjYE0YvCvNDBROnUkuTXVPNMQWod57mIDCqsDKE2GU4wx0SwCOv6E7C3V8vqHaAZjogmXIK8URPWky2JPxVMRK7LE3aPlS_oBfAxHdpRsF5KB5WC4I5oR8phNKJDXKMfNemiNBVcKFScSiWQHucsP_r7hwWODKQiOJRRkycTRHMPCAhJsj-5rMVY4Mij5rYV3oZjB6ViEtjBFjdWlMDyhjj5YWJjCONbZ5qU6IyOxb9Nt3StCH25WVcdZ5NpRH2Ps-cmsKvZPbFzLqHSa1OurxfF2nGBj66n3BJ0KdDIOTTH6puasufsiOIMTTWka2YFWaT_iZaLm8FJQOZjZxgOKJpecQAAlYvH8HK-h7lKmfHDkAh-vl8eAdpfUxTHFOnJcene6FXYora7tipwqRHHjxIsgmCPaO69doiO6CAlTXThcdNes2EPTX4iCpl2oWPR8TKXOkB9Cu3tJ6YhRCHHir3a8nxeqffqe4K2Log4jPCwLpA1J0u-HvCJ8YnWQj4CAXLPVzYnRbF8FhG2Gmu3jtE7klxtT-jUy-KDfswsVhH6iUx9J62kktCrHXwZyZBJ7ZAJem4MxI8AbypLUdl3efns39XfhnYRdeey6HVB5GDAWNo3NLlF8w7btWdYYJfCi-4uqIstzcnqEhWjxbiFRs0fVdCXZYpj9VKM5bI1HYJGg0--NIQm3tMxlheWwM_68E_FnM8LYRk4wwHCKWgxIei_XKI-5gtRISf9YY.QY9gGMOfjv44moCkNJ17d2MYDUAaJ8OlT7Qd9BlQvc0'

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
