import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
//pipes
import { NgPipesModule } from 'ngx-pipes';

import { NgaModule } from '../../theme/nga.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
// import  { AllCustomersModule } from './components/all-customers/all-customers.module';
import { routing }       from './customers.routing';
import { Customers } from './customers.component';
import { AllCustomers } from './components/all-customers/all-customers.component';
import { CustomerBookingDetails } from './components/customer-booking-details/customer-booking-details';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlockCustomerModal } from './components/block-customer-modal/block-customer-modal.component';
import { CustomerModal  } from './components/customer-modal/cusotomer-modal.component';
import { CustomerActionModel } from './components/customer-action-model/customer-action-modal';
import { DeleteCustomerModal } from './components/delete-customer-modal/delete-customer-modal.component';
//import {BlockCustomerModal} from './components/block-customer-modal/block-customer-modal.component'
import { AddCustomerModal } from './components/add-customer-modal/add-customer-modal.component';
import { EditCustomerModal } from './components/edit-customer-modal/edit-customer-modal.component';
import { SingleCustomer } from './components/single-customer/single-customer.component';
import { OrderModule } from 'ngx-order-pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    NgxPaginationModule,
    routing,
    NgbModalModule,
    NgPipesModule,
    MultiselectDropdownModule,
    OrderModule,
    // AllCustomersModule
  ],
  declarations: [
    Customers,
    AllCustomers,
    BlockCustomerModal,
    CustomerModal,
    CustomerActionModel,
    DeleteCustomerModal,
    AddCustomerModal,
    EditCustomerModal,
    SingleCustomer,
    CustomerBookingDetails

  ],
  entryComponents: [
    BlockCustomerModal,
    CustomerModal,
    CustomerActionModel,
    DeleteCustomerModal,
    AddCustomerModal,
    EditCustomerModal,

  ],

})
export class CustomersModule {}
