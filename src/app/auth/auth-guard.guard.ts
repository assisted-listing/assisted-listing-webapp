import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, NavigationExtras
  , UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  redirects: string[]


  constructor(private router: Router, private authService: AuthService) {    
    console.log('AuthGuard:')
 
    const currentNav = this.router.getCurrentNavigation()
    const navState = currentNav?.extras.state as {
      redirect: string[]
    };
    console.log(navState)


    if (navState && navState?.redirect) {
      this.redirects = navState.redirect
      console.log('Redirect Found')

    }}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.authService.isLoggedIn()




    switch (state.url) {
      case '/login': {
        if (isAuth) {
          this.router.navigate([''])

        }
        return !isAuth;
        break;
      }
      case '/register': {
        if (isAuth) {
          this.router.navigate([''])
        }
        return !isAuth;

        break;
      }
      case '/profile': {
        if (!isAuth) {
          this.router.navigate(['login'])
        }
        return isAuth;
      }
      case '/pricing': {
        if (this.containsCheckout(this.redirects)) {
          //If we're coming here from a checkout (listing has been made)
          if (isAuth){
            //Let them through if logged in
            return true}
          else{
            //if not logged in bring them to login/signup first
            this.redirects.push('pricing')
            const navigationExtras: NavigationExtras = {
              state: {
                redirect: this.redirects
              }
              
            }
            this.router.navigate(['login'], navigationExtras)
            return false
          }
        }
       else{
        return true
       }
      }
      default: {
        return true


        break;
      }
    }

    return isAuth;
  }

  containsCheckout(arr: string[]): boolean {
    var contains = false
    arr.forEach((element: string) => 
    { if (element.includes('checkout')){ contains= true } })
    return contains

  }
}