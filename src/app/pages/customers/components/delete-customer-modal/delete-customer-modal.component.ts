import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as customer from '../../state/customer.actions';
import * as app from '../../../../state/app.actions';
import 'style-loader!./delete-customer-modal.scss';

@Component({
  selector: 'delete-customer-modal',
  styleUrls: [('delete-customer-modal.scss')],
  template: `
  <div class="modal-content">
  <div class="modal-header">
    <h4 class="modal-title"> Delete Customer</h4>
    <button class="close" aria-label="Close" (click)="closeModal()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body bg-clr">
  <h5>Are you sure you want to delete this Customer?</h5>
  </div>
  <div class="modal-footer bg-clr">
    <button type="button" class="btn delete-btn" (click)="deleteCustomer()">Delete</button>
    <button class="btn delete-close" (click)="closeModal()">Cancel</button>

  </div>
</div>
`
})

export class DeleteCustomerModal implements OnInit,OnDestroy {

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



  ngOnInit() { }
  closeModal() {
    this.activeModal.close();
  }

  deleteCustomer() {

    let obj = {
      'userID': this.activeCustomer._id
    };
    this.store.dispatch({
      type: customer.actionTypes.DELETE_CUSTOMER_RECORD,
      payload: obj
    });

    this.activeModal.close();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



