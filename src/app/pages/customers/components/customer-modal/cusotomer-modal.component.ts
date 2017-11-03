import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as app from '../../../../state/app.actions';
//import { PipeTransform, Pipe } from '@angular/core';
import 'style-loader!./customer-modal.scss';

@Component({
  selector: 'customer-modal',
  templateUrl: './customer-modal.html'
})

export class CustomerModal implements OnDestroy{

  subscription: Subscription;
  modalHeader: string;
  public activeCustomer;
  constructor(
    private activeModal: NgbActiveModal,
    private store: Store<any>
  ){

   this.subscription= this.store
      .select('customer')
      .subscribe((res: any) => {
        this.activeCustomer = (res.activeCustomer) ? res.activeCustomer.customer : null;
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
  };
  closeModal() {
    this.activeModal.close();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



