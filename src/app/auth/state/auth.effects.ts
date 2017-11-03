import { get } from 'lodash';
import { Injectable, VERSION } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service/user-service/user.service';
// import { AuthService  } from '../../theme/services/authService/auth.service';
import { AuthService } from  '../service/auth.service';
import { BaThemeSpinner } from '../../theme/services';
import { Router } from '@angular/router';
import { ToastrService , ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import * as auth from './auth.actions';
const types = ['success', 'error', 'info', 'warning'];

@Injectable()
export class AuthEffects {
  private lastInserted: number[] = [];
    options: ToastrConfig;
          title = '';
          message = '';

  version = VERSION;

  //Effect >>>>>>>>
  @Effect({ dispatch: false })
  login: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_LOGIN)
    .do(action => {
      let number1 = 100;

      this.user_service.login(action.payload).subscribe((result) => {

        if (result.statusCode === 200) {
         // hide loader
          this.baThemeSpinner.hide(number1);
           //this.toast_service.showSuccess();
           localStorage.setItem('token', result.data.token);
           this.store.dispatch({ type: 'AUTH_GET_USER_ROLES', payload: result });
          //  this.store.dispatch(new auth.AuthLoginSuccessAction(result));
          //token store in localstorage
        //   localStorage.setItem('role', result.data.admin[0].role);
       
          let tokenSession = localStorage.getItem('token');
          localStorage.setItem('tokenSession', JSON.stringify(result.data.tokenSession));
           let loggedIn = this.authService.login();
           console.log('login value',loggedIn);
            if (loggedIn) {
              console.log('yipeee');
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages';
            console.log('redirect',redirect);
            this.router.navigate([redirect]);
          }
        }
        else{
        }
      }
      , (error) => {
            this.baThemeSpinner.hide();
            if (error.message){
            //   let m = 'Email or password does not match !';
            let m = error.message;
              let t = '';
              const opt = cloneDeep(this.options);
              const inserted = this.toastrService[types[1]](m, t, opt);
              if (inserted) {
                this.lastInserted.push(inserted.toastId);
              }
            }
      }
    );

    });

  @Effect({ dispatch: false })
  loginError: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_LOGIN_ERROR)
     .do((action) => {
     });

  @Effect({ dispatch: false })
  loginSuccess: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_LOGIN_SUCCESS)
    .do((action) => {
      console.log('action of login success',action);
      // window.localStorage.setItem('token', JSON.stringify(action.payload.data.token));
      // this.authService.login();
    });

  @Effect({ dispatch: false })
  register: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_REGISTER)
    .do((action: any) => {

    });

  @Effect({ dispatch: false })
  registerSuccess: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_REGISTER_SUCCESS)
    .do((action: any) => {
    });

  @Effect({ dispatch: false })
  registerError: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_REGISTER_ERROR)
    .do((action) => {});
  @Effect({ dispatch: false })
  logout: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_LOGOUT)
    .do(() => {
        let number1 = 100;
        this.baThemeSpinner.show();
        this.user_service.logoutUser().subscribe((result) => {
        if (result.statusCode === 200){
          this.baThemeSpinner.hide(number1);
          this.store.dispatch(new auth.AuthLogoutSuccessAction(result));
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('tokenSession');
        //   window.localStorage.removeItem('role');
        //   window.localStorage.removeItem('HospitalId'); 
          this.router.navigate(['login']);
        }
      }
      , (error) => {
        this.baThemeSpinner.hide(number1);
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('tokenSession');
            this.router.navigate(['login']);
      }
    );

    });

  @Effect({ dispatch: false })
  logoutError: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_LOGOUT_ERROR)
    .do((action) => {

    });

  @Effect({ dispatch: false })
  logoutSuccess: Observable<Action> = this.actions$
    .ofType(auth.actionTypes.AUTH_LOGOUT_SUCCESS)
    .do(() => {
        this.authService.logout();
    });



  @Effect({ dispatch: false })
  getUserInfo$ = this.actions$
    .ofType('AUTH_GET_USER_ROLES')
    .do(action => {

    });

    @Effect({dispatch: false})
    forgot$ = this.actions$
        .ofType('AUTH_FORGOT_PASSWORD')
        .do(action => {
            let number1 = 100;
            this.user_service.forgotPassword(action.payload).subscribe((result) => {
                    if (result.statusCode === 200) {
                        this.store.dispatch(new auth.AuthForgotPasswordSuccess(result));
                        let m = 'Reset email sent successfully!';
                        let t = '';
                        const opt = cloneDeep(this.options);
                        const inserted = this.toastrService[types[0]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
                        //hide loader
                        this.baThemeSpinner.hide(number1);
                    }
                    else {

                    }
                }
                , (error) => {
                    this.baThemeSpinner.hide();


                    if (error.message) {
                        let m = error.message;
                        let t = '';
                        const opt = cloneDeep(this.options);
                        const inserted = this.toastrService[types[1]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
                    }
                }
            );

        });


  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private user_service: UserService,
    private authService: AuthService,
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

