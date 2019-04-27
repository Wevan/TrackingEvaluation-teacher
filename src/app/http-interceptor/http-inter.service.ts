import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpInter implements HttpInterceptor {
  private baseUrl: string;

  constructor(private router: Router) {
    if (environment.production) {
      this.baseUrl = 'http://106.12.195.114:8085';
    } else {
      this.baseUrl = 'http://localhost:8085';
    }
  }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let ok: string;
    let request: HttpRequest<any>;
    // 登录无需要token
    console.log('URL ', req.url);
    if (req.url === '/user/login' || req.url === '/report/down') {
      request = req.clone({
        url: `${this.baseUrl}${req.url}`,
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    } else {
      request = req.clone({
        url: `${this.baseUrl}${req.url}`,
        headers: req.headers.set(
          'Authorization',
          localStorage.getItem('token'),
        ),
      });
    }
    return next.handle(request).pipe(
      tap(
        event => (ok = event instanceof HttpErrorResponse ? 'success' : ''),
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 403:
              // 登录错误，返回
              console.log('403了');
              localStorage.clear();
              this.router.navigateByUrl('/login');
              break;
          }
          console.log('拦截器的error', error);
        },
      ),
    );

  }


}
