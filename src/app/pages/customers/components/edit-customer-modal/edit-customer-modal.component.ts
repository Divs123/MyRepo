import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../theme/validators';
import * as customer from '../../state/customer.actions';
import * as app from '../../../../state/app.actions';
import 'style-loader!./edit-customer-modal.scss';

@Component({
  selector: 'edit-customer-modal',
  templateUrl: 'edit-customer-model.html'
})

export class EditCustomerModal {

  public activeCustomer;
  public form: FormGroup;
  public name: AbstractControl;
  public mobile: AbstractControl;
  public companyName: AbstractControl;
  public countryCode: AbstractControl;
  public companyAddress: AbstractControl;
  public submitted: boolean = false;


  constructor(private activeModal: NgbActiveModal, private store: Store<any>,
    private fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.compose([ Validators.minLength(3)])],
      //'mobile': ['', Validators.compose([])],
      'companyName': ['', Validators.compose([])],
     // 'countryCode': ['', Validators.compose([])],
      'companyAddress': ['', Validators.compose([])]

    });

    this.name = this.form.controls['name'];
  //  this.mobile = this.form.controls['mobile'];
    this.companyName = this.form.controls['companyName'];
    //this.countryCode = this.form.controls['countryCode'];
    this.companyAddress = this.form.controls['companyAddress'];



    this.name.setValue('Lokinder');
    // this.store
    //     .select('lang')
    //     .subscribe((res: any) => {
    //         //setting language
    //         if (res.resourceBundle != null)
    //         {
    //             for (let j = 0; j < res.resourceBundle.length; j++)
    //             {
    //                 //console.log(res.resourceBundle)
    //                 this.language[res.resourceBundle[j].messageKey] = res.resourceBundle[j].customMessage;

    //             }
    //         }

    //     });


    this.store
      .select('customer')
      .subscribe((res: any) => {
       
        this.activeCustomer = (res.activeCustomer) ? res.activeCustomer : null;
      
        this.name.setValue(this.activeCustomer.name);
        //this.email.setValue(this.activeCustomer.email);
        // if (this.activeCustomer.contacts && this.activeCustomer.contacts[0].countryCode)
        //   this.countryCode.setValue(this.activeCustomer.contacts[0].countryCode);
        // if (this.activeCustomer.contacts && this.activeCustomer.contacts[0].mobile)
        //   this.mobile.setValue(this.activeCustomer.contacts[0].mobile);
        if (this.activeCustomer.contacts && this.activeCustomer.customerAddressID)
          this.companyName.setValue(this.activeCustomer.customerAddressID.companyName);

        if (this.activeCustomer.contacts && this.activeCustomer.customerAddressID)
          this.companyAddress.setValue(this.activeCustomer.customerAddressID.companyAddress);

        if(res.EditCustomerSuccess )
        {
            this.activeModal.close();
        }
        else if(res.error)
        {
           if(res.error.statusCode === 401 || res.error.statusCode === 403)
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



  onSubmit(formValue) {
   // insertin _id in payload
    formValue._id = this.activeCustomer._id;

    this.store.dispatch({
      type: customer.actionTypes.EDIT_THIS_CUSTOMER,
      payload: formValue
    });
   


  }
}



