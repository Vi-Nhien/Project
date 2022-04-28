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
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.Lo_2-JeKlBVClfTLWRu1EUu97zO23AVFhRyWkvB1xB_P6L2eHYELYGfziihD6Kx2psenLdF6JKO_3Mwf14jfMK42uow2Da_t5vhFjg11j2vlSgbPnZ-GeBIM6y4vW4RZBijQ6KvVzLZicH56yM-9A3W1exzzK0RIP6WpYQk1uMkeIUe9sqzDaBfIVGI0ivAu2Z2CKbYyhJqZijlHqr5h9klSDt_NWBXB-dZGA4Aik57w1Y3iHMmwfxZUd11pjkrOIeFrMaSRrSaJwYJnMz_uZGPGhf8pT7hJmiuB7A_xmAMzTzAkQZ5oeIUJYk7srB9HbTil8W-jFw5sQv1ZGzrEMA.mffRCJukGOflHHdelN6r3w.KeH33AaBWxxMUsxNCVsByu7nzMGhDKP3oJczVrxt5CvWc_-bX1_sjJob23V3Q1UMoN-w5Ei5crVQMVtdogykexDExdJ2GPH3iiIymM-wd7sbcSWzbUKaN6hIbrQmccFsrXeU-EUq2AnptTB4TQ1wUXGQmD8FNq1R7Edz6_VvP2TFcHyAQZ0uBMZdKlQOPaKBqRPSsLVIjtbxcF2ig5hEa_hJqBJGNM8hVHyBmPNSdaL6HKVXEVwZF3YQLg3_IXc4SZazbf5nSlGbUDtRWonBU2d68Yvx6Kquk36_Ih5gDMkKBVZN_I6s7aIwIEyv5oSS4R58ixJBX6ZhwFkf8gpNeoKk9hrGa4-f9jZSlo00p1yMUqzSPYHyHwpKz9d6tHHVwNpc0rYjSnMHaJFdZAJ-bP8-NRtGEK3dLGuPUjnbtc6Cu7Fc4RSoEybsMv_i-kxKMjFP0qccy6LitIaj_NEVCCLZID8IoOJV3vXHOYdjODXBxVZO5I2nNLmILMAB17_zYpnG6qlN3B1HHvuAkVGnXTWzXvDMj7hUqf5PW2AXrcPjj9uYD3M_rQ5bSywA7x-WXGnGNyUWG6Fp_tUAHiM5Kuzr7vHkgUZu2vVTyA7NJjKYbfz162G5vopgDe16T6pWdryfdWOt4j23QSZ6xjADJ1DRRuSgbMPwiCLzg0I-Vj1O3s6eT619m36jvUvVMRoUJn-sfGYgyhTyl7Aaa1QmMsG_bm_ZTbzuhYwRcubo2_GXcozTQ-A5Z5CN7qMVUkkHWCU3ehIat0Kl7SGsceJFuiLTYFPkAiT_LyEeK6eBcKVKAe1LFcvJNNwXHY6OHDKRXk--XjPH-fgCU9zLHHHlr8YiAzVlQnFhoGch1UpFCTOnavjZe6Cq_Lf7zwPOn9c9kJEv4uHiFSg-rh8IfbkbkxUpMoim0Kb8YS1vDQnm_mWkCLj1Qb4EXT60bI57oRFLV61zXnoE74hC0KUGBK14NdGscTI8We9cWx7ZZOiWRJlsC9Ek6o71JtGX6ecZkjP2mbHo3ckOqPIzVRPUlwgrxGHotL1suf5v8Kcxd_lhTWPLLgCxLmYMCDDe1oqfj0C2WRsEdVG9qzp5YrBfkB5VhE9WIMewIpAB5RiJ-52d605dRcocgbpyIsuFQ089-xYK24VE8jPfS8_fDP3dgcLwKo5-33HiadKqqjdXyF-eAVZ024zzMAkUzZ9BNvVz2kM091ib7MvcHKndC5K7T2ohq71BFrm5-7KHGIQot-3xxlEjKAnUCYLc4uMXHIhexZhjOz5qngrhSmX-jrx74WGRWgwiSIcplJJdG3H-HWlaTu9-XsJ-NxyuYHFKQF6PRsyXFpinZGJMqZMASPzGusDAXq18GoF6kMP2H3G-RIwth71AeGIFOJUzn1rPOxvHz1WnAuEOL_N__1yctdNms4SHADmbXjq5LAWnumZ4u_jnXZs-3pSLdAlmcLfwwJ2zUKlraV6MdWfVb3SLXmmraZI831jq8EHb2sf9XSh9OSg5z-4.opfJUATru5Gi4VxeEhRkfTWmlVH3Q3aYCMu7U2yyHxg'

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
