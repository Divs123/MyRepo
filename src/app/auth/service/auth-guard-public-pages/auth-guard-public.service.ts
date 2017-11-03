import { Injectable }  from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthPublicPagesService } from './auth-public.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthPublicPagesService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url): boolean {
    if (this.authService.login()) { return true; }
    // Navigate to the login page with extras
    this.router.navigate(['/pages']);
    return false;
  }
}


