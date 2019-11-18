import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.authentication.pipe(take(1), map( user => {
           // console.log('auth gard triggered!!!');
            if (user && user.token) {
            //    console.log('auth gard triggered!!! return true');
                return true;
            }
          //  console.log('auth gard triggered!!! redirect to auth');
            return this.router.createUrlTree(['auth']);
        }));
    }

}
