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
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIzRUE5NTEyRjY2NkIwMDUxRjdDRDM3Q0UyOTMyQjE3Q0UyQ0I4OEEiLCJ4NXQiOiJJLXFWRXZabXNBVWZmTk44NHBNckY4NHN1SW8iLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiJhYTQwODI5ZS03YzBiLTQ4ZDEtYmYyMC01NmQ1ZTY2NzgyZWUiLCJuYW1lIjoibWFzdGVyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibGVxdWFuZ2x1YzAxQGdtYWlsLmNvbSIsInJvbGUiOiJnaWFuZ192aWVuIiwidXNlcl90eXBlX25hbWUiOiJIZVRob25nIiwidXNlcl90eXBlIjoiMCIsImlkX3VzZXIiOiIyMDQ1Iiwib2lfcHJzdCI6ImFuZ3VsYXJjbGllbnRfZ3YiLCJpc3MiOiJodHRwOi8vZGV2YXV0aC5hc2N2bi52bi8iLCJvaV9hdV9pZCI6IjliYmU5MDk4LTAyZDUtNDVmZS1hMDY0LTMyY2UxMmZhODI3YSIsImNsaWVudF9pZCI6ImFuZ3VsYXJjbGllbnRfZ3YiLCJvaV90a25faWQiOiI4NTIxYjIzMi0yNjU3LTRhMzEtOWE4Yi04NWU0NzM1YmZjZjQiLCJhdWQiOiJyYmFjX2FwaSIsInNjb3BlIjoiaW50ZXJuYWwgb3BlbmlkIG9mZmxpbmVfYWNjZXNzIGVtYWlsIHVzZXJfbmFtZSBsYXN0X25hbWUgZmlyc3RfbmFtZSBpZF91c2VyIiwiZXhwIjoxNjUzNDUxOTM4LCJpYXQiOjE2NTM0NTAxMzh9.WG2DatzcBlPtDMiAW2LJt741N0KbM6Ko84RMaKNSklZwyIicgaOQuKnTtzc8sdCMQgJgay7q7wxZBcs-ee_VjViCBn9chQGVoN7j4QSormZr226w6UrDMF-PIvKccNurHlp79Ybs44ZrbhA_tDiSyIHAOeSPK8udxKAQW9Z5KXxHgMKzBSUgy37fA1DDdi5ufDvjTNB_mQ5UP5wZNRAqI4qOQ3YSAGjzsh1WBvVi6Ybiaxxk9a0Cjj2pFMrIE9VMoGoV-rc5Z4NkxZ91D1n8jpCNC3hWBm1WyCq92JcrkV8Ws3qeTaiokpJN2BNWM511tkcs8-BpCS6-KoFeSJPUFA'
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
