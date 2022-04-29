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
  ' eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.AbOfqKRZYOxuntw6E3MxdO2RMU9vizfCBt4MY_7WvuYBoYpzpU97bXAUxuwmQf2zE466uqqXAC1UMQY_Y_0tmMuKpZP9nmYsdC62ywi0YMP5QswqnstS-KSVZJ68b1cMrnL61BHdifQxT-3m_NAHfzn6Uqkgs7p7NGTg8snYZmU5oPlG1tB_Ucp6y-jmWvk2tri1e43qo_oh6pMXVrPd2Xu6YJoyzUVaKpGUoryhQdY_QdauLvU6jh_ugf8dTBgtOy8eFwN9AT8UAxbhmsquLFiVXo1KaOMi9mAFRppYSjYkumGjdaVyqQ7y1MOEgNhAN2vD34bchz_EclZBdcToDw.isiFSGlJPkbnNwQ6IAwt2w.wApLiK5FOGvLXjvgoAlEfs3qbgcP9eJTnZBrP5K6zSc9iPwEOv3EJ3yoyr5nX2IP0VICMBEHyNcyb2tptw0fDyvRvmul_HM261pvajGRClrmAehtrpE4unoJ5ZUG7nXXQyKYdqqjf3Y3gwqzo2IiWGEwpVZaiKx-q7ReCkvR0cfRXBzhGWqdG8q9QJiH2PnSxzfuv1rIg3i6xllnVS8sEukSK4Ld41f95sAI77azCcJefoNXJr2-AAcRJvT-upCwgLrGWRkyQ8PjdnpoSj_5kVq1dI_0dj_O04TLGKKcbhrdSFtVTj5e_xUkYzLmD9YN6CejY50IZPvbSdDJLeXcnfxoOqJGaSaF67zvdOwqv2PU9TkMuvvoDpIYsojSjVVABHEHgpyJrF1AJt-zkYKfAX9ki3D7y7CjHITMJVUGVEYYGGByfPKhN0Qleh6RJWdutsuT3-bXdVy1RY94v0zl0LDYqRf5DtiSLjdoRRfpb8KcV47OFljaW6HsEsKRkUOs8BWd8DrdrJU7_7_irpzZsSxH2XMum-XFmmBikymE0PfU5_e46GGIKCBxDW2lBEDMFizje6WI37g1GERhkizicSjtjFMOdWMYCtlGTs3D2YmbSR8Y5fnaT1UTyKEHsN6hHzq1JGOPEJQrqHyF_4AC0kVvw4UUALMGk-ExUImfTsxdkmHXB1cRBLiyidtsDrv5S_nUZpPqueu2PV6yVbgzskFWGS-KvCEMNzZYtgnXx1293TazuLrzJgrXoNasMcYZ8TKeiQ2QEoIBT2Cwl7YiITQyHqHIsV6Tb0vnnc4jtZ-62JqXyG72SjqoX9QDrzd25dllrQ3RN4IQhDGyMvyJwy28vUpffA6gypRzj5TSxD8mW9H2setEuqnrp9XkQttRSLMkf_m-AKf9wDarlBUf3KcCuhenD30C59_dpbMf8lHDJC_knHAXdHVJHfrfEnfC74O1MKJ1gow4uLFa1tNXhJHaAYfPts_uMg3KE-V20jtQPPtz5DGP0UVTgkatv_6IZJCDji-10J0scSW8bZw1JdjcUBwWRWUYg6YDJA5UDAYeMWkl_9SZz2NBO3-r5sF5zO_DJMu1cwMaftDFyJiPWLY8C-tPCvb_VZmvIITXLLzyCtKmCqVLhd_gVzj_ubF27JaAfVRmcN7iEGkNMW6R5izCUmvs17StYHLwVbSFJOVHLUK0tTk4a79TBkgatIN2Rrtbj59wauTKmyr8QvwWx2TzTAKzuuu-SXwPWx0dUowG83o6YpuizCYFRKoysUCeFFlSGY9TZBkMwAFl81flRnhsaMX_xOsjek2lODqwfuZgjtmF4jsQCKuKr8p3UcLejjOucpDlJ76UzeyVRun-cbLXIAn9x8i8m2tyS0V4EgBshOlBFlSu5tPyzOWhyVxq8HzDy1HC8so6GpCzKrAvVmq4pgJH9bjsBxxQl2W0ET3aKLhvEqcQxTZx2HFv37cG6V1ntrlsa4-i6HlpsSIBIsRaZP5KOYeJEam2PVA1uVI.H9_YEjU2XgdSOQZ6IUhDEu3DEoDghEykDrAYz4-IzA4'

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
