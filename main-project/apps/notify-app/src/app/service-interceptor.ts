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
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIzRUE5NTEyRjY2NkIwMDUxRjdDRDM3Q0UyOTMyQjE3Q0UyQ0I4OEEiLCJ4NXQiOiJJLXFWRXZabXNBVWZmTk44NHBNckY4NHN1SW8iLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiJhYTQwODI5ZS03YzBiLTQ4ZDEtYmYyMC01NmQ1ZTY2NzgyZWUiLCJuYW1lIjoibWFzdGVyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibGVxdWFuZ2x1YzAxQGdtYWlsLmNvbSIsInJvbGUiOiJnaWFuZ192aWVuIiwidXNlcl90eXBlX25hbWUiOiJIZVRob25nIiwidXNlcl90eXBlIjoiMCIsImlkX3VzZXIiOiIyMDQ1Iiwib2lfcHJzdCI6ImFuZ3VsYXJjbGllbnRfZ3YiLCJpc3MiOiJodHRwOi8vZGV2YXV0aC5hc2N2bi52bi8iLCJvaV9hdV9pZCI6IjliYmU5MDk4LTAyZDUtNDVmZS1hMDY0LTMyY2UxMmZhODI3YSIsImNsaWVudF9pZCI6ImFuZ3VsYXJjbGllbnRfZ3YiLCJvaV90a25faWQiOiJjOWJkZTQxMS03M2EwLTQ1MjQtOTM0OS1lY2M0OWIwNTcxMDciLCJhdWQiOiJyYmFjX2FwaSIsInNjb3BlIjoiaW50ZXJuYWwgb3BlbmlkIG9mZmxpbmVfYWNjZXNzIGVtYWlsIHVzZXJfbmFtZSBsYXN0X25hbWUgZmlyc3RfbmFtZSBpZF91c2VyIiwiZXhwIjoxNjUzMzg4NDczLCJpYXQiOjE2NTMzODY2NzN9.AG0_Cnyu6lwabFci-M13PjjhqWXoSBNe225oKehwZAxeo7u8JRUfbBw6ku6EpBWcEW_hFYJg92DJlQKo8fjb1KvpHgUpUxtvRhD8mKirRy2BxgdprnKiMGtVNTjocKED76c4qRAWt-ZhBPYcFc8fOCVCmmIrfFe8ytqhQ3OJql5NpQAOoEWZVb4zU1Ssq2gf6Av4WNBUA4R5lUVmwpg2Z4Yv1oTy_vnPQXFlpPjESpZQa2cOZRqicuMUmT6FjFKs1C5cRfuUfqVEvT4fBfSD66BpAgDUiPdslEgBdtn968_BPqaBp_bAK7kOZYa_1uOAImlsOBfo9mq2fW1v7gWewg'
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
