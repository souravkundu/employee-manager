import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    localId: string;
    email: string;
    idToken: string;
    registered?: string;
    refreshToken: string;
    expiresIn: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    // DECLARATIONS
    authentication = new BehaviorSubject<User>(null);

    private user: User = null;

    private apiKey = 'AIzaSyB4qXqz6TvVEkamK7m44YpTzKbAQyi0g4I';

    private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.apiKey;

    private signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apiKey;

    constructor(private http: HttpClient) { }

    // SIGN UP REQUEST
    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.signUpURL,
            {
                // tslint:disable-next-line: object-literal-shorthand
                email: email,
                // tslint:disable-next-line: object-literal-shorthand
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(response => {
                this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
            }));
    }

    // AUTHENTICATION REQUEST
    authenticate(email: string, password: string) {

        return this.http.post<AuthResponseData>(
            this.loginURL,
            {
                // tslint:disable-next-line: object-literal-shorthand
                email: email,
                // tslint:disable-next-line: object-literal-shorthand
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap((response) => {
                this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
            }));

    }

    // ERROR RESPONSE HANDLER FOR AUTHENTICATION
    handleError(errorRes: HttpErrorResponse) {

        let errorMessage = 'an unknown error occurred!';
        // console.log(errorRes);
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        const message = errorRes.error.error.message;

        switch (message) {
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
                errorMessage = message.split(' : ')[1]; break;
            case 'EMAIL_EXISTS':
                errorMessage = 'Email is already registered!'; break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Username/Password is not correct!'; break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email is not associated with any account.'; break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'; break;
            default: errorMessage = message;
        }
        return throwError(errorMessage);
    }
    // RESPONSE HANDLER FOR AUTHENTICATION
    handleAuthentication(email: string, userID: string, token: string, expiresIn: number) {
        this.updateUser(new User(
            email,
            userID,
            token,
            new Date(new Date().getTime() + expiresIn * 1000)
        ));
        localStorage.setItem('userData', JSON.stringify(this.user));
    }

    // UPDATE USER
    updateUser(user: User) {
        this.user = user;
        localStorage.setItem('userData', JSON.stringify(this.user));
        this.authentication.next(this.user);
    }

    // GET USER
    getUser() {
        return this.user;
    }

    // AUTO LOGIN
    autoLogin() {

        const userData: {
            email: string,
            id: string,
            $token: string,
            $expiresIn: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
            this.updateUser(
                new User(
                    userData.email,
                    userData.id,
                    userData.$token,
                    new Date(userData.$expiresIn)
                ));
        } else {
            this.updateUser(null);
        }
    }
}
