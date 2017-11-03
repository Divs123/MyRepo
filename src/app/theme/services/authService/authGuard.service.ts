import { Injectable }  from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url): boolean {
    console.log('check login');
    //console.log(this.authService.login())
    if (this.authService.login()) {console.log('true'); return true; }
    else{console.log('false'); return  false; }
    // Store the attempted URL for redirecting
    //this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    // this.router.navigate(['/login']);
    // return false;
  }
}


