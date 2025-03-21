import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    // Clone the request and add The Authorization Header

    const authRequest = req.clone({
      setHeaders: { Authorization: `Token ${accessToken}` },
    });
    return next(authRequest); // pass the modified request to next handler
  }
  return next(req); // if no token, proceed with the original request
};
