import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
 } from "@angular/common/http";
 import { take, exhaustMap} from "rxjs/operators";

 import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor( private authService: AuthService){

  }


  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.user.pipe(
      take(1),
      exhaustMap( (user) => {
        if(!user){
          return next.handle(req);
        }
        
        // the Http request now has auth="token"
        // attatched to it (look at firebase documentation)...
        // https://firebase.google.com/docs/database/rest/retrieve-data#section-rest-uri-params
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token)
        });

        return next.handle(modifiedReq);
      })
    )
  }
}
