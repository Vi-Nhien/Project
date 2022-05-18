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
  'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIyM0VBOTUxMkY2NjZCMDA1MUY3Q0QzN0NFMjkzMkIxN0NFMkNCODhBIiwidHlwIjoiYXQrand0In0.DW797W-9D42-baASy0BGK_JuKBlOJUmfoDng_tRLzsUZfErA26a2bB96ffDYYVORXxUK1_-Lzcq4fyVNpfx9E1Lod_Kf36d3od0PchMj4IgLN68nRhM_lCa9blqLEc_5_aScTYbEA_lxediGEoNJ0EMcQ5GnW9KY5E9J3-XNvL868TgQLoo60TIowX-v0lnLcEh8sclblc2tvGFiCtGMzXOAyGr3UbGFJ1A6IVX_OgxWiuezxYq9DEVM0dHGkpujGvNL4tIcH7sYwQSBnX1lNqZWDMSP_InrPtDP7v8CaUmEqB5KGAsfYHyqQteekD8cOUhW47bimz_7iSvVj5tJNg.o2IYQd0cdgGxgSRclmMh4g.g6obsHYoZst-0Xw5IcM533-HescVAs09ENXr1AVFHqIc18zgB-Hw3IHQU2YDxp3mrjECnNa1BrpgM_6Io3LvSRhL-VaGEGeeMFZETIvYvX9Q9aGYyi1kj-mtbwVm2rkcu00VyRXlsbOUOG4LZ8BJJIZomUjtkVjKjkDju96ZVRGEVYCzyiD-VMoSpfUnpoJO1LQutLGSA1whnZQ4pZ2dziVw0jQVmo3R65GBFZqq9oXyDdwqew5V4Wb8XKwkn91WQSbXfTkbO1VSUxhCnZwPYMMvTojYexizWUnr_ewiToYefObUDPj3Jc1ui-Bpo0tD-Op4KXjY72LlvCLNJe0gOyb04FwRqd029zFkk1jw-2OWcMZWbexeXoF1w_w41k9PSw6iaxyr3LkjswBgbgKPR9JCf-7wLuuQ3AlOfk3BRM52MuYMRT1RzmqpLZ6FZmjI8HxH0WOUESitDBCNCi2mOrafooRMG4zfa95OgL1a5q7OsWMaEnFdIyDYbNoc0NQfc8YWE9GXcDWUpCqrl8ZHnu-q2-mvEYubRjIP6DeBmTZD8Pur9CFX6a9b2PUqdVafsKczOY0XsVsE8mhhNFl7qB6OQLqrI26OnfJuqLiXrBJ0GygpNZj-BsX-DwqXz-iChtLRc0vuWzZmOXLw2mVRDiJdeSDLoycWnjBZyhQF5V0bU8QCeueL_HG6rSdq8NiQkUjw4hdBvUX_yUgdg0KsexruNqQIVjllMs1WK0S25e7LT-qO7d-2SLxabIwvsULlBlSzxbSGdbnEm-rjuggiVKqfdDlBmVFsraEV4obAx0S7I6A1G6zQmYsK6gOoZ1F3L66mvhiKyFaS3RMn9zePCpXW7FGvsnTSpm6bvenepBy2vq0mS-LEqEqGISchIkL2a2Vsg7eFxPOKWcg2_cYdyTQZATayF1eGIp0kvB41dJuynf91d7cZPhn6e0r6VJ7yefT4-bLlMiUUBHJBYJkPasnqZzniId9IgnA_yHu_dNNeemlQA97HJNqCGVISnTnATHfalzcRzndOKcb-cqvs6wPNC-ZUtAldw5eTfMwXMyOha7hmTqHLuAD_ZKyAHiZkxd0-HAKhQP-aKOFM4xmewYZ7jIffIe9S8QiXvf7jurzq0XYNB3M6TnGuNDg2oCAwpgs-WO-pccKivrlC4fSD8XgNzEmKzAcyAu5jQWvPFuWpp2jxc1YdfLHmzNZ0gUueXsa5txwhvH0p9GV90mCos5yxyxm0LXeUl4ut2BDmzx-sOtW4lGiL-JOZxfFMpRMfmnuavOcPS4BvQL1sLxIVmtIlW5UNc4PZSs-w0GnkjGO0WTEy5sblsmJbrjac4029tanAyylvAqfqFs-bObYucqRNePjUoNsnKF_dG_N1NC2_dSFZu89XIlZv_4Kkoo2TjMlftseOyDFU-TnS1p8wzSDSfijRI0ynsWjKu3QLY6QpNQALNCRr4s161CHPSTBZFCBe4qb1YMqPXi3U-NWbMvnvL4JM77HdZEKw1QkUaNsMYhWYtHmQC760vTKliCa8kcoSmA_jPJJKs-UCWaRGXpWxQjMND-TNeuPj9V5sMIDzudUtJ-jnwT8LdvUTHAonHw6AQ7lgoA_DEBSnvfF71KFSq0QED6Y8ZzdFNdu1lkp5aQWGZMa4nKvGlMsg6ihxqmZB8PPdBI95b6hWL0yj8A.XuhSjXZzXaBOhlGEnbjvDYfRIEdb8oCG97EhVdMtNKY'
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
