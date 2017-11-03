import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
@Injectable()
export class AuthPublicPagesService {
  isLoggedIn: boolean = true;

  // store the URL so we can redirect after logging in
  redirectUrl: '/pages';

  login() {
    let token = localStorage.getItem('tokenSession');
    if (token){
       this.isLoggedIn = false;
       return this.isLoggedIn;
    }
    else {
          this.isLoggedIn = true;
          return this.isLoggedIn;
          }
  }

   logout(): void {
     window.localStorage.removeItem('tokenSession');
   }

}
