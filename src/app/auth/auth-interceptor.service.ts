import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.authentication.pipe(take(1), exhaustMap(user => {
            if(user && user.token) {
                const modRequest = request.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modRequest);
            } else {
                return next.handle(request);
            }
        }));
    }
}
