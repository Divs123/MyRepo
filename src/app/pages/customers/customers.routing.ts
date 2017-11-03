import { Routes, RouterModule }  from '@angular/router';
import { Customers } from './customers.component';
import { RegisterCustomers } from './components/RegisterCustomers/register-customer.component';
import { AllCustomers } from './components/all-customers/all-customers.component';
import { SingleCustomer } from './components/single-customer/single-customer.component';
import { CustomerBookingDetails } from './components/customer-booking-details/customer-booking-details';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Customers,
    children: [
       { path: '', redirectTo: 'allcustomers', pathMatch: 'full' },
       { path: 'allcustomers', component: AllCustomers },
       { path: 'singleCustomer', component: SingleCustomer },
       { path: 'customer-booking-details/:id', component: CustomerBookingDetails },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
