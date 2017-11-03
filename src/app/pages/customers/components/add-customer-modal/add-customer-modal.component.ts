import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator,CountryCodeValidator } from '../../../../theme/validators';
import * as customer from '../../state/customer.actions';
import * as app from '../../../../state/app.actions';
import 'style-loader!./add-customer-modal.scss';

@Component({
  selector: 'add-customer-modal',
  templateUrl: 'add-customer-model.html'
})

export class AddCustomerModal implements OnDestroy {

  subscription: Subscription;
  public activeCustomer;

  public form: FormGroup;
  public name: AbstractControl;
  public userName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;

  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public mobile: AbstractControl;
  public companyName: AbstractControl;
  public countryCode: AbstractControl;
  public companyAddress: AbstractControl;
  public errorFound;
  //public latitude:AbstractControl;
  //public longitude:AbstractControl;
  public submitted: boolean = false;


  constructor(private activeModal: NgbActiveModal, private store: Store<any>,
              private fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.email])],
      'mobile': ['', Validators.compose([Validators.required,CountryCodeValidator.phoneNumber ])],
      'companyName': ['', Validators.compose([Validators.required])],
      'countryCode': ['', Validators.compose([Validators.required,CountryCodeValidator.countryCode])],
      'companyAddress': ['', Validators.compose([Validators.required])],

      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.userName = this.form.controls['userName'];
    this.lastName = this.form.controls['lastName'];
    this.email = this.form.controls['email'];
    this.mobile = this.form.controls['mobile'];
    this.companyName = this.form.controls['companyName'];
    this.countryCode = this.form.controls['countryCode'];
    this.companyAddress = this.form.controls['companyAddress'];
   // this.latitude = this.form.controls['latitude'];
    //this.longitude = this.form.controls['longitude'];

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];



   this.subscription= this.store
    .select('customer')
        .subscribe((res: any) => {
          // console.log("response of customer model",res)
         
              if(res.addCustomerSuccess)
              {

                  this.activeModal.close();
              }
              else if(res.error)
              {
                if(res.error.statusCode === 401 || res.error.statusCode === 403 )
                {
                      this.activeModal.close();
                        this.store.dispatch({
                          type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: res.error
                      });

                }

              }


        });

  }



  closeModal() {
    this.activeModal.close();
  }



  onSubmit(formValue,event){
 
    //@todo Modify this after backend fix ...
    // event.preventDefault();
    formValue.password = formValue.hasOwnProperty('passwords') ? formValue.passwords.password : formValue.password;
    delete formValue.passwords;
    // //formValue.isTrue=true;
    formValue.deviceType = 'WEB';
    this.store.dispatch({
      type     : customer.actionTypes.ADD_THIS_CUSTOMER,
      payload  : formValue
    });


  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


