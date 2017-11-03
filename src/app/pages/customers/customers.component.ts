import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../global.state';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as customer from './state/customer.actions';

@Component({
  selector: 'Customers',
  template: `
              <ba-content-top></ba-content-top>
               
              <br>
              <router-outlet></router-outlet>

            `
})
export class Customers {
 public isMenuCollapsed: boolean = false;
  constructor( private store: Store <any> , private router: Router,private _state: GlobalState  ) {
  }
 ngOnInit() {
  }
}
