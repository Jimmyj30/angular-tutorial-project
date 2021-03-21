import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap} from "rxjs/operators";
import { throwError, Subject, BehaviorSubject} from "rxjs";
import { environment } from "../../environments/environment";

import { User } from "./user.model";

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
// only one authservice, as it is provided in root
@Injectable({providedIn: "root"})
export class AuthService{
  user = new BehaviorSubject<User>(null);
  // this subject informs other components if the user state changes...
  // a BehaviorSubject is like a "normal" subject that emits values...
  // However, a BehaviorSubject also gives the user immediate access
  // to previously emitted values (starts with a default value...)
  // we can "fetch" a user if the user previously logged in through
  // this BehaviorSubject.

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router){

  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap( (resData) => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      })
    );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError( this.handleError ),
      tap( (resData) => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      })
    );
  }

  autoLogin(){
    // checks if there is a valid user snapshot in storage...
    // past user data stored using localStorage.setItem in
    // this auth.service's handleAuthentication function

    // this unstringifies the data into a simple object (stores member
    // variables but not member functions like getters/setters... )
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if( !userData ){
      return;
    }

    // loadedUser is a "complete" User class so we can use
    // the getter again (like loadedUser.token)
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // when the token sent by google to keep track of
    // the login statement is valid, this if statement will be valid...
    if( loadedUser.token){
      this.user.next(loadedUser);

      // difference between the "logout Date" and the current Date
      // in milliseconds
      // this will start a countdown for this userData object...
      const expirationDuration = new Date(
        userData._tokenExpirationDate
      ).getTime() - new Date().getTime()

      // starts a countdown which will log the user out when it finishes
      this.autoLogout( expirationDuration );
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    console.log( expirationDuration );
    this.tokenExpirationTimer = setTimeout(
      () => { this.logout(); },
      expirationDuration
    );
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An unknown error occurred";

    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }

    switch( errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct";
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number // in seconds
  ){
    const expirationDate = new Date(
      new Date().getTime() + (expiresIn*1000)
    );

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    // whenever we handle authentication, we get an expiry date that
    // we will get logged out by through the autoLogout function...

    localStorage.setItem("userData", JSON.stringify(user));
  }

}
