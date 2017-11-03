import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../auth/model/user.model';
import { Language } from '../../../multilingual/model/lang.model.ts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { BaThemeSpinner } from '../../../theme/services';
import * as auth from '../../../auth/state/auth.actions';
import { EmailValidator } from '../../../theme/validators';
import 'style-loader!./forgot.component.scss';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot.component.html'
})

export class ForgotPassword implements OnInit {
  public form: FormGroup;
  public email: AbstractControl;
  user = new User();
  language = new Language();

  constructor(fb: FormBuilder
    , private modalService: NgbModal
    , private store: Store<any>) {

    this.form = fb.group({
      'email': [this.user.email, Validators.compose([Validators.required, EmailValidator.email, Validators.minLength(4)])],
    });

    this.email = this.form.controls['email'];

  }
  ngOnInit() { }

  onSubmit() {
    if (this.form.valid) {
      let data = {
        email: this.user.email,
      };
      this.store.dispatch({
        type: auth.actionTypes.AUTH_FORGOT_PASSWORD,
        payload: data
      });
    }
  }
}