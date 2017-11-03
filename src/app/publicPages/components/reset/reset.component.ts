import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../auth/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaThemeSpinner } from '../../../theme/services';
import * as auth from '../../../auth/state/auth.actions';
import 'style-loader!./reset.scss';
// TOAST
import { ToastrService , ToastrConfig } from 'ngx-toastr';
//import { LoopBackAuth, SDKToken } from '@lb-sdk'

//import { AuthService } from '../../auth.service'

@Component({
  selector: 'app-password-reset',
  templateUrl: 'reset.component.html'
})
export class ResetComponent {
  public form: FormGroup;
  private token: string = null;
  public user: any = {
    password: '',
    confirm_password: '',
    verify: '',
  };
  public password: AbstractControl;
  public confirm_password: AbstractControl;
  public realms: any[] = [];

  constructor(
   fb: FormBuilder,
   private store: Store<any>,
   private toastrService: ToastrService, // TOAST
   private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.passwordResetToken;
     // this.loopBackAuth.setToken(new SDKToken({ id: params.token, created: new Date() }))
    });

     this.form = fb.group({
          'password': [this.user.password, Validators.compose([Validators.required])],
          'confirm_password': [this.user.confirm_password, Validators.compose([Validators.required])],
        });
    this.password = this.form.controls['password'];
    this.confirm_password = this.form.controls['confirm_password'];
  }

  reset() {   
    let fd = new FormData();
    if(this.user.password == this.user.confirm_password) {
      if (this.form.valid) {
        fd.append('passwordResetToken',this.token);
        fd.append('newPassword',this.user.password);
          this.store.dispatch({
          type: auth.actionTypes.AUTH_RESET_PASSWORD,
          payload: fd
        });
      }
    }
    else{
      let m = 'Password and Confirm Password are not same';
      let t = 'Error!';
        const inserted = this.toastrService['error'](m, t);
    }
  }
}
