import { Component, VERSION } from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BaThemeSpinner } from '../../../theme/services';
// import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import * as lang from '../../../multilingual/state/lang.actions';
import { EmailValidator } from '../../../theme/validators';
import { User } from '../../../auth/model/user.model';
import { Language } from '../../../multilingual/model/lang.model.ts';
import * as role from '../../../roles/state/role.actions';
import 'style-loader!./login.scss';

// TOAST
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
const types = ['success', 'error', 'info', 'warning'];

@Component({

    selector: 'login',
    templateUrl: './login.html',



})
export class Login {
    options: ToastrConfig;
    title = '';
    type = types[0];
    message = '';
    allLanguage = [];

    version = VERSION;
    private lastInserted: number[] = [];



    public form: FormGroup;
    public email: AbstractControl;
    public role: AbstractControl;
    public checkboxRemember: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;
    public domains: any[];
    public settings: any;
    user = new User();
    //user.role='admin';
    public loginAdmin;
    public loginCustomer;
    public loginSP;
    public loginDriver;
    public roles;
    language = new Language();


    constructor(fb: FormBuilder,
        // private translate: TranslateService,
        private baThemeSpinner: BaThemeSpinner,
        private store: Store<any>,
        private toastrService: ToastrService // TOAST
    ) {
        // default IS SET TO ADMIN
        this.store.dispatch({
            type: role.actionTypes.AUTH_ROLE, payload: {
                role: this.user.role
            }
        });
        // TOAST
        this.options = this.toastrService.toastrConfig;
        this.store
            .select('lang')
            .subscribe((res: any) => {
                this.allLanguage.length = 0;
                if (res.language != null) {
                    for (let i = 0; i < res.language.length; i++) {
                        if (res.language[i].locale != '$default') {
                            if (this.allLanguage.indexOf(res.language[i]) === -1) {
                                this.allLanguage.push(res.language[i]);
                            }

                        }
                    }

                }

              
                // setting language
                if (res.resourceBundle != null) {
                    for (let j = 0; j < res.resourceBundle.length; j++) {
                        this.language[res.resourceBundle[j].messageKey] = res.resourceBundle[j].customMessage;

                    }
                }
                this.loginAdmin = this.language.adminOption;
                this.loginCustomer = this.language.customerOption;
                this.loginSP = this.language.spOption;
                this.loginDriver = this.language.driverOption;
                this.roles = [

                    { value: 'admin', display: this.loginAdmin },
                    { value: 'customer', display: this.loginCustomer },
                    { value: 'serviceProvider', display: this.loginSP },
                    { value: 'driver', display: this.loginDriver }
                ];


            });


        // to get all languages
        this.store.dispatch({ type: lang.actionTypes.GET_ALL_LANGUAGE });

        // default language is english
        localStorage.setItem('currentLanguage', 'en');
        this.store.dispatch({ type: lang.actionTypes.GET_ALL_RESOURCE_BUNDLE, payload: 'en' });




        this.form = fb.group({
            'email': [this.user.email, Validators.compose([Validators.required, EmailValidator.email])],
            'password': [this.user.password, Validators.compose([Validators.required])],
            // 'role': [this.user.role, Validators.compose([Validators.required])],
            'checkboxRemember': [this.user.checkboxRemember]

        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.checkboxRemember = this.form.controls['checkboxRemember'];
        // this.role = this.form.controls['role'];


    }

    isEmail(control: FormControl): {
        [s: string]: boolean
    } {
        if (control.value) {
            if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return {
                    noEmail: true
                };
            }
        }

    }


    // for implementing multilingual
    changeLang(value) {
       
        localStorage.setItem('currentLanguage', value);
        this.store.dispatch({ type: lang.actionTypes.GET_ALL_RESOURCE_BUNDLE, payload: value });
    }

    onSubmit(values: Object, event) {
        let remember;

       
        if (this.user.checkboxRemember) {
            remember = this.user.checkboxRemember;
            this.user.checkboxRemember = remember;
        }
        else {
            remember = false;
            this.user.checkboxRemember = remember;
        }

      
        event.preventDefault();
        this.submitted = true;


        if (this.form.valid) {
            let data = {
                email: this.user.email,
                password: this.user.password,
                rememberMe: this.user.checkboxRemember,
                role:'admin',
                // role: this.user.role,
                deviceType: 'WEB'
            };
            this.baThemeSpinner.show();
            this.store.dispatch({
                type: auth.actionTypes.AUTH_LOGIN,
                payload: data
            });
        } else {
           
        }
       
        this.store.dispatch({
            type: role.actionTypes.AUTH_ROLE,
            payload: {
                role: this.user.role,
            }
        });
        localStorage.setItem('Role',this.user.role);
        


    }

    // TOAST
    openToast() {
        let m = 'amar';
        let t = 'amar';
        const opt = cloneDeep(this.options);
        const inserted = this.toastrService[this.type](m, t, opt);
        if (inserted) {
            this.lastInserted.push(inserted.toastId);
        }
        return inserted;
    }

}
