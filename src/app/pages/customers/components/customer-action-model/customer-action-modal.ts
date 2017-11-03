
import { Component, OnInit, OnDestroy,PipeTransform, Pipe } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// FORM
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './user-interface';
//
//import { Store } from '@ngrx/store';
import * as customer from '../../state/customer.actions';

@Component({
  selector: 'customer-action-modal',
  template: `<div class="modal-content">
  <div class="modal-header">
    <h4 class="modal-title">Add New Customer</h4>
    <!-- <button class="close" aria-label="Close" (click)="closeModal()"> -->
    <button class="close" aria-label="Close" (click)="closeModal()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" style="background-color: lightskyblue;">

      <form [formGroup]="myForm" novalidate (ngSubmit)="save(myForm.value, myForm.valid)">
        <div class="form-group">
          <label for="">Name</label>
          <input type="text" class="form-control" formControlName="name">
          <small [hidden]="myForm.controls.name.valid || (myForm.controls.name.pristine && !submitted)" class="text-danger">
                Name {{language.isRequired}}  (minimum 5 characters) .
              </small>
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input type="email" class="form-control" formControlName="email">
          <small [hidden]="myForm.controls.email.valid || (myForm.controls.email.pristine && !submitted)" class="text-danger">
                Email {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">Password</label>
          <input type="password" class="form-control" formControlName="password">
          <small [hidden]="myForm.controls.password.valid || (myForm.controls.password.pristine && !submitted)" class="text-danger">
                Password {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">primary Mobile Number</label>
          <input type="number" class="form-control" formControlName="primaryMobile">
          <small [hidden]="myForm.controls.primaryMobile.valid || (myForm.controls.primaryMobile.pristine && !submitted)" class="text-danger">
                primary Mobile Number {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">Company Name</label>
          <input type="text" class="form-control" formControlName="companyName">
          <small [hidden]="myForm.controls.companyName.valid || (myForm.controls.companyName.pristine && !submitted)" class="text-danger">
                Company Name {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">Country Code</label>
          <input type="text" class="form-control" formControlName="countryCode">
          <small [hidden]="myForm.controls.countryCode.valid || (myForm.controls.countryCode.pristine && !submitted)" class="text-danger">
                Country Code {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">Company Address</label>
          <input type="text" class="form-control" formControlName="companyAddress">
          <small [hidden]="myForm.controls.companyAddress.valid || (myForm.controls.companyAddress.pristine && !submitted)" class="text-danger">
                Company Address {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">App Version</label>
          <input type="number" class="form-control" formControlName="appVersion">
        </div>
        <div class="form-group">
          <label for="">Latitude</label>
          <input type="number" class="form-control" formControlName="latitude">
          <small [hidden]="myForm.controls.latitude.valid || (myForm.controls.latitude.pristine && !submitted)" class="text-danger">
                Latitude {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">Longitude</label>
          <input type="number" class="form-control" formControlName="longitude">
          <small [hidden]="myForm.controls.longitude.valid || (myForm.controls.longitude.pristine && !submitted)" class="text-danger">
                Longitude {{language.isRequired}} .
              </small>
        </div>
        <div class="form-group">
          <label for="">Image</label>
          <input type="file" class="form-control" formControlName="image">
        </div>

        <!-- <div class="form-group" formGroupName="address">
          <label for="">Address</label>
          <input type="text" class="form-control" formControlName="street">
          <small [hidden]="myForm.controls.address.controls.street.valid || (myForm.controls.address.controls.street.pristine && !submitted)" class="text-danger">
                Street required
              </small>
        </div>
        <div class="form-group" formGroupName="address">
          <label for="">Postcode</label>
          <input type="text" class="form-control" formControlName="postcode">
        </div> -->
        <button type="submit" class="btn btn-default">Submit</button>

      </form>




  </div>
  <div class="modal-footer">
    <button class="btn btn-primary confirm-btn" (click)="closeModal()">Close</button>
  </div>
</div>`
})

export class CustomerActionModel implements OnInit{
    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    modalHeader: string;

   //public activeCustomer;
  constructor(
    private customerActionModel: NgbActiveModal,
    private store: Store<any>,
    private _fb: FormBuilder
  ){
    //  this.store
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

  };

    ngOnInit() {
        this.validationFxn();
        this.subcribeToFormChanges();
    };

    validationFxn(){
      this.myForm = this._fb.group({
        name           : ['',     [<any>Validators.required, <any>Validators.minLength(5)]],
        email          : ['',     [<any>Validators.required]],
        password       : ['',     [<any>Validators.required]],
        primaryMobile  : ['',     [<any>Validators.required]],
        companyName    : ['',     [<any>Validators.required]],
        countryCode    : ['',     [<any>Validators.required]],
        companyAddress : ['',     [<any>Validators.required]],
        appVersion     : ['',     []],
        latitude       : ['',     [<any>Validators.required]],
        longitude      : ['',     [<any>Validators.required]],
        isTrue         : [true,   [<any>Validators.required]],
        deviceType     : ['WEB',  [<any>Validators.required]],
        deviceToken    : ['123',  [<any>Validators.required]],
      });
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    };

    save(model: User, isValid: boolean) {
        this.submitted = true;

        this.store.dispatch({
          type     : customer.actionTypes.ADD_THIS_CUSTOMER,
          payload  : model
        });
    };

  closeModal() {
    this.customerActionModel.close();
  };
};



