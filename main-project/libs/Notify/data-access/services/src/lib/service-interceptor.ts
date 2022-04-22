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
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.MWlI1k2YnccZ8WiVjCX0_y9vT_LNjoT5s0-h8J_JCesqei5_Gclvk2cG_1eF1SRATNblkEED1c-_55QsEiEnY6KzcVnPTsQRNLOAw3wPiIE_i3-_op812LGufiWMddOALPJ51puwegAnpvVvSHH5J1_Zns01oB5ngYR7jV9W_Lq0EqQVx0wM0YogZ0aB3AGweI-BViImC1RavD3ZXeQCNaTCbP60g00xptNYqwAy9KU_ZAX_5XMZuvMEnVoTpwqsSKM7dditegc9HEOHIMJd-6v2fMxdlSSuyMVpoMDBA51wiMCaY6QWdgTIi7V2LZxV5rJ0xxiUZ8Od7jo_9sV_kw.1SyNrOylLLG4Fj199lPlWw.U7Q7iEDekqTXHLbqErR_GteT1qkTGFQJxzHlDX7QM8-H4-vO_7mYWUg6rEQpkGfcWOcqw8pEIyjcmNPNtEGnlCYgLnqXhPFrSsEtCSpPH0HmvflF8B79i_tlmwV-SZwxlKgBDJH0fzVgClhi2ca4d_V_bsmgPBW9ow0re-nETFXdCDa_XVt4Zme3cdC0R99WhEGkfqf4aSrCXyVcLkJQrMmJNDqGCa3cGXslxCmEMjcjBA30MZHTlOW8c4cFbUHiEOK897T9NpTHxlXt2P7WfN-M4uqPEr-TRioULiLbz9GP8kzwaLiyG2s6G1kUSj2-ynb3tX5R9nnTbEVUyb0U2CrqylQcQ0mHacOM5TyxOzInzDNC9abqmQp7CK4H0gkxKGZ9E03DSfvog82XO3Cf6iySYKLUhyHZk9r4VUF2C5mAFA1lqQvfNtWwD-01A8V4CgZrMCsF4qUIV8_3cKBKWZ32RZQJnaY_C4Zfv8_Ihl35D0k760PqjuEaSJJB5Bl_YVl60ZeaIx8GXyIEnPPYHieqPtXWZM3c4ND5T2VnNQfdsUjqohQgnvRSp7X8QlrShYzdaLJr0hhzT_fFLbqscgXfdkO6LnSn_GUEhywa7BHm2v9jtSv0jBpHCHb3vDXRLzzDrwCTo8w7_BTLOSi2L6TNA-yjGEXtPnmyq8O6-iyjH-lVnAUkqKjw774-rfZ8Rza36ZAf-dlf55741p3bFmmBT_uBnI7Ziucso6pfuwTMq4zoQt08buXB57kalo4uQYf5T5P8TnNcRtccuAlyTGMq7G_zB5v9joI1HkyHI_L4wqwtiCxFvYfMBWiQJK4FJRz1earieyWI0q50ciwFwM8kn1A7ZBRawx6BviNtFMFoo85QNSUOrBCNn3gBbr1q6SsjxJpcDVXg8jdyuENPe2blm-2NRdX-0-0Qnt3c-v1zoeVTHUjMepx1fogrvRFVvUP-OZffzCn9Cw9Dmkz2VOrlHCwXESXDI4WQxb4j4bQdIAjvlew33eN3QRr0-RdNeqJrFsFNNfLMKFe3we4jcGbKAdK_OVBBAkhC_MpqmHg2TyORMO_4wBr_7ERbmrdDX2jfa7_YIihC1lNe8f37XCcrD-22ClDO823-JYRjMggXdYUVg49R-mlBuh0Tv_HYZ1vkuM_njZJ9tm8yhuK8_TuggnCK9TUv7aAzqF0nyrSZ47OP5MuPZw7zcUwAgHyfWt9JacFLpQ51TvuL_5EUrsI2ubb0DUgVO03t2TyCwMKlmmqLlucnh-dfLsuSgjO9cI2suCE-9oyN1j0ZVhuuGwwpo_XAwy2yhdxOLprFrqGfnAhtGOZqXq9gGeH1QsSqOrfGqJoE3MK7QyPQGiCOXHj1YqU36kXHnQnQS4VcCxMEhBJ85_k96T7gweyR0e3dMCuGjpCSj829524mDwU2fVEKt0WziR6fVLp4z71uTVKJUE51aARW2uaHQ1LGb7Cbv9gzpb-2wpcpxhL_9HxsqTFw4qo9qZjpyEPsC_Ao8lg.N4TQQzANwQ12s73LcCpew9HoVOBslbvn5VpnVAItLwI'

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
