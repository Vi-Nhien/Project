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
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIzRUE5NTEyRjY2NkIwMDUxRjdDRDM3Q0UyOTMyQjE3Q0UyQ0I4OEEiLCJ4NXQiOiJJLXFWRXZabXNBVWZmTk44NHBNckY4NHN1SW8iLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiJhYTQwODI5ZS03YzBiLTQ4ZDEtYmYyMC01NmQ1ZTY2NzgyZWUiLCJuYW1lIjoibWFzdGVyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibGVxdWFuZ2x1YzAxQGdtYWlsLmNvbSIsInJvbGUiOiJnaWFuZ192aWVuIiwidXNlcl90eXBlX25hbWUiOiJIZVRob25nIiwidXNlcl90eXBlIjoiMCIsImlkX3VzZXIiOiIyMDQ1Iiwib2lfcHJzdCI6ImFuZ3VsYXJjbGllbnRfZ3YiLCJpc3MiOiJodHRwOi8vZGV2YXV0aC5hc2N2bi52bi8iLCJvaV9hdV9pZCI6IjliYmU5MDk4LTAyZDUtNDVmZS1hMDY0LTMyY2UxMmZhODI3YSIsImNsaWVudF9pZCI6ImFuZ3VsYXJjbGllbnRfZ3YiLCJvaV90a25faWQiOiJiODhkOGRhMy1hYzlhLTQyMzMtOWYxNC01NTQyOGQyMDhiYjQiLCJhdWQiOiJyYmFjX2FwaSIsInNjb3BlIjoiaW50ZXJuYWwgb3BlbmlkIG9mZmxpbmVfYWNjZXNzIGVtYWlsIHVzZXJfbmFtZSBsYXN0X25hbWUgZmlyc3RfbmFtZSBpZF91c2VyIiwiZXhwIjoxNjUzMDQxMzEzLCJpYXQiOjE2NTMwMzk1MTN9.INMS90fR6vkh3uNMABoRYuFcnB69WdSl6h9IM5G7xSGeL9PdECzBxoB6PGC5lZIWRZvKfXU-yrTlbn2_oTXOqywjchhCqlXyPm7K1O2uF-nAIAw0h_bLeReMZzsyV1oQV6WPiYkJrkxi4ldU7_ynen-Lwe-q5pdugNLsd4xzAry5ikwPmYOgRtIv9RRoGJihaUsprTM4vw_G2qvnFLyaEn2AY0WvX8JufbwudiJK12PZOQMb9hw0ETflEyoFgRY_AWuvWCjuGmro-JGDNGx0REWdNn2QCH-VEKq-NV5nF79jzRYRsBrexVxEJDA0QbFfIT27-3olI__FjUoISQfTHA'
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
