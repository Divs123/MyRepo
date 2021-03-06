import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as customer from '../../state/customer.actions';
import * as app from '../../../../state/app.actions';
import 'style-loader!./block-customer-modal.scss';

@Component({
  selector: 'block-customer-modal',
  template: `
  <div class="modal-content">
  <div class="modal-header">

    <h4 class="modal-title" *ngIf="activeCustomer.isBlocked == true"> Unblock Customer</h4>
    <h4 class="modal-title" *ngIf="activeCustomer.isBlocked == false"> Block Customer</h4>
    <button class="close" aria-label="Close" (click)="closeModal()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body bg-clr">
    <h5 *ngIf="activeCustomer.isBlocked == true">Are you sure you want to unblock this customer?</h5>
    <h5 *ngIf="activeCustomer.isBlocked == false">Are you sure you want to block this customer?</h5>
  </div>
  <div class="modal-footer bg-clr">
    <button type="button" class="btn delete-btn" (click)="blockCustomer()" *ngIf="activeCustomer.isBlocked == true">Unblock</button>
    <button type="button" class="btn delete-btn" (click)="blockCustomer()" *ngIf="activeCustomer.isBlocked == false">Block</button>
    <button class="btn delete-close" (click)="closeModal()">Cancel</button>

  </div>
</div>
`
})

export class BlockCustomerModal implements OnInit,OnDestroy {
  subscription: Subscription;
  modalHeader: string;
  public activeCustomer;
  constructor(private activeModal: NgbActiveModal, private store: Store<any>) {
   this.subscription= this.store
      .select('customer')
      .subscribe((res: any) => {
        this.activeCustomer = (res.activeCustomer) ? res.activeCustomer : null;
        if(res.error)
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



  ngOnInit() {}
  closeModal() {
    this.activeModal.close();
  }



  blockCustomer(){

    let obj = {
      '_id'       : this.activeCustomer._id,
      'isBlocked' : !this.activeCustomer.isBlocked
    };
    this.store.dispatch({
      type     : customer.actionTypes.BLOCK_THIS_CUSTOMER,
      payload  : obj
    });

    this.activeModal.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



