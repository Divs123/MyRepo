import { get } from 'lodash';
import { Injectable, VERSION } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RoleService } from '../service/role.service';
// import { AuthService  } from '../../theme/services/authService/auth.service';

import { BaThemeSpinner } from '../../theme/services';
import { Router } from '@angular/router';
import { ToastrService , ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import * as auth from './auth.actions';
import * as role from './role.actions';

const types = ['success', 'error', 'info', 'warning'];

@Injectable()
export class RoleEffects {
  private lastInserted: number[] = [];
    options: ToastrConfig;
          title = '';
          message = '';

  

  @Effect({ dispatch: false })
  authRole: Observable<Action> = this.actions$
    .ofType(role.actionTypes.AUTH_ROLE)
     .do((action) => {
      
        this.roleService.setRole(action.payload).subscribe((result) => {
         
        
          let roleSuccess=result;
     
         
          this.store.dispatch({ type: role.actionTypes.AUTH_ROLE_SUCCESS, payload: {roleDetail: roleSuccess} });

        });

     });


  constructor(
    private actions$: Actions,
    private store: Store<any>,
   private roleService: RoleService,
    private baThemeSpinner: BaThemeSpinner,
    private router: Router,
    private toastrService: ToastrService
  ) {

        this.options = this.toastrService.toastrConfig;

  }
  openToast() {
            let m = 'amar';
            let t = 'amar';
            const opt = cloneDeep(this.options);
            const inserted = this.toastrService[1](m, t, opt);
            if (inserted) {
              this.lastInserted.push(inserted.toastId);
            }
            return inserted;
        }

}

