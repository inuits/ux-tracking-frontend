import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class MyHttpInterceptor implements HttpInterceptor {

  // Add Bearer token to headers if request is not an Authentication request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('auth')) {
      return next.handle(req);
    }

    const authReq = req.clone({headers: req.headers.set('Authorization', localStorage.getItem('token'))});
    return next.handle(authReq);
  }
}
