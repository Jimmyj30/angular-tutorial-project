import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
 } from "@angular/router";
 import { Observable } from "rxjs";
 import { map, take} from "rxjs/operators";

 import { AuthService } from "./auth.service";


@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean
    | UrlTree
    | Promise<boolean |UrlTree >
    | Observable<boolean | UrlTree>  {
    return this.authService.user.pipe(
      take(1),
      map( (user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(["/auth"]);
      })
      // or... get a boolean from the map function...
      // tap( (isAuth) => {
      //   if( !isAuth ){
      //     this.router.navigate(["/auth"]);
      //   }
      // })
    );
  }

}
