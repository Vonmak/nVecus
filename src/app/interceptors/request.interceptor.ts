import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const expiryDate = localStorage.getItem('accessExpiry');
    const tokenExpired = this.tokenExpired(expiryDate);

    if (!tokenExpired) {
      request = this.auth(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        const userId = localStorage.getItem('userid');
        if (error.status === 401 && userId) {
          return this.reauth().pipe(
            switchMap(() => {
              request = this.auth(request);
              return next.handle(request);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
  tokenExpired(expiryDate: string | null) {
    if (!expiryDate) return true;
    if (new Date() > new Date(expiryDate)) return true;
    return false;
  }

  auth(request: any) {
    const token = localStorage.getItem('accessToken');
    return request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  reauth(): Observable<any> {
    return this.authService
      .refreshToken()
      .pipe(map((token) => this.authService.setToken(token)));
  }
}
