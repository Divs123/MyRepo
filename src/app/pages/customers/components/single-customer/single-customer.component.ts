import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as customer from '../../state/customer.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import 'style-loader!./single-customer.scss';

@Component({
  selector: 'single-customer',
   templateUrl:'single-customer.html', 
})
export class SingleCustomer implements OnDestroy{

  subscription: Subscription;
  newUserData;

  constructor(
    private store: Store<any>,
    private modalService: NgbModal
  ) {

   this.subscription= this.store
      .select('customer')
      .subscribe((res: any) => {
        if(res.showCustomerData)
        {
            this.newUserData = res.showCustomerData.data;
            //console.log("customer data...........................",res.showCustomerData.data)
        }
        else
        this.newUserData=JSON.parse(localStorage.getItem('NewCustomer'));
        // console.log("iflocalstorage-----",this.newUserData)
      });
    
  };
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
