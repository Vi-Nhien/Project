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
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.VRXLs22Cv1WzrEmzDIgekPqQxhLOaETHySuArYwCMKIY8WwwO1uMdSDoeOp2K7b6sqI7AsKJdGVUBiKFRO5Fnj8EudvCOPgKE-psotNDk3DXWOMxM622qmGSfU3GT8nSa3mnVTWgykZUiasbtXQmDlQ7PwAkXVGrE9IxCJul27m5KhxtgQKy1oV_EtKopNM-tHb52hRRq78rEBPrFULpsrRnFoVs3YeODzcJW0RT8CPvCirZILATM8D-e8gd9cfw5-tvhn4EXtd-GPR1ZcLNEXvw8o3f737GaLZGyxIYXkRgl2MrQtj2HmLYWIcdWOsANxb-A1KNL4--gnw_wBk88A._vQNFNhDcXrd55L-_OC6Vg._bArFe_X4-Etzsu1E022uMOcujcr_-k0x8e6Z0GAAFraYQsL7bYTu8__hP7aRvfXjsAMnD1cfbWhwjOLZp4kawBL2Uakc0YTeuv6HXv8WEcQ15A2YJKT6JV7SRQhcG_6XrL3A9rTFLMud7wFf2yPwO5EWRniQLx9fsShLS_dy6mH4PWGhMdIFsMfQcSJ7kLCVtfS8McYbklq16sWbdMK1NTY-8QsF_6ANCDNF-hO0liDl0nIYPcAJUKzl7Y0OREQw78JoNCLZrCn7mOEyZg1PR0gGUEqw9OqyyaB_0yHnzsVhGNUkJ9Mw0lgBQO6szSQ5zed9bhVY7mRZb3W5pV_SmUYtH-G4-reMb9XftLrTS1831srFSy5Uv1ZktKmdOk_tgY0_LzUi71xlKoaMxZ_lcC8RAQawfYe9lV7E1ZGaNGWz8IEXMEW6om7Aom8Oiwwhm0vp63y0QTmxORCq37xMEvGJwF1BhlwYJIw1d-RIMdp4f4o5SkPNaR7NsJjlNjWYHvOrK8KyTYwvZ_Vha4Eb2cSS_yjgIilLnGOj_kSc90rkwFosaP6xpGAr2bbxNX8qpNdRRqxX2_6dX8nS33TXud12IXVXypVDzPlF2A_xQBJPjPT8gvbeh4Z5EBRrGArfTohgJz8GXfhABibXMYXjSlwQLRo_w_srTvYjIxj3kjyBHor3szjloAw6heCN8KLtSOY257KzaJW3LZkg9bUnRIWRkqDieRh5hX-UUF5Mv-bcA2JxmSMNWoFRXavAJ08XwQNQokQ5EXu6WirdR9jnNdUgqQm7n9gryEdsJUdZpXvzHoUnhLTNE_7gjjQdSCv2FioB5pcIHpCXNKGhUcIBqK-nf5XZHppG0-wdmwStrm_LgdvmBudZV9pJgVCr1tqJpHThHODzCK7cU6BrsrPIlT9QpGvcdwwp4eL_U1pEV8GIjl60nFWpo5MevYLjSqql5UDPLPwVIGLcqGw7UsUaKrOdSEg9Iz8jaE-JyXFyY82IvjOJFZwS28O6q_nvYQDcoBwOqnhmIO6N0F7dsvafGLCA-CvpWW65_FyUXkQM02RHUD_RSoTUlAifMHRWuQrgtF-bp05uzlCPIEyfM-dFVosG-SbJmzCH1_OHYh6JecHEudxBqHgtjvLmQvQuIIajjuoL17cAdtEjje-eThq5bqfaKGCePObLkUq3_BdOAmTXaKKntQ9XyfVnH2-C8ZV6a35BEjODilY-1RGtnbOypn5GVpD3FTCswoWUN7QRFy0Voe7sISPsxbfwGowz4Gm7bCsb7foW__Mw9WuVPi_n_fpgWG-6jhB_cYKU99QxC1exypYeadNy92KnZ1ExxlAv9cJF8c9uHabjsY_j0UYfyk3DuEpc_kMB_UC-C38vAL805c2NHFvooyGSfWjRvGS0ucJo4UYdzG6JBPIDZqxVMcXOE69KywpXkII4ryL7vQJaFgjZGIoRYlqV6OqRMrR3Y3kJTYulNkZzr7HvqI1x0DmDeYAZvsqHHiEotBQj_o.Eodhp0_Quwv3zCooEun-sqbDEOFOo-UcnSLrlBTN-1M'

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
