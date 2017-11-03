import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
import { cloneDeep, random } from 'lodash';
import { CustomerService } from '../../../services/customer-service/customer.service';
import * as customer from './customer.actions';
import * as app from '../../../state/app.actions';


@Injectable()
export class CustomerEffects {

  options: ToastrConfig;
  title = '';
  // type = types[0];
  message = '';

  private lastInserted: number[] = [];
  // GET CUSTOMER DETAIL
  @Effect({ dispatch: false })
  showCustomerDetail: Observable<Action> = this.actions$
    .ofType('SHOW_CUSTOMER_DETAIL')
    .do((action) => {

    });


  // ADD CUSTOMER RECORD
  @Effect({ dispatch: false })
  addThisCustomer$ = this.actions$
    .ofType('ADD_THIS_CUSTOMER')
    .withLatestFrom(this.store)
    .do((storeState) => {
      let action = storeState[0];
      let state = storeState[1].customer;
      this.CustomerService
        .addThisCustomer(action.payload)
        .subscribe((result) => {
          if (result.message == 'Success') {
            let m = 'Successfully created customer';
            let t = 'Authentication';
            const opt = cloneDeep(this.options);
            const inserted = this.toastrService[types[0]](m, t, opt);
            if (inserted) {
              this.lastInserted.push(inserted.toastId);
            }
            this.store.dispatch({
              type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
                currentPage: state.currentPage, limit: state.limit,
                role: 'customer',   // @todo fix static value here ..
                filter: state.filter
              }
            });
            this.store.dispatch({
              type: customer.actionTypes.ADD_THIS_CUSTOMER_SUCCESS,
              payload: result
            });

          }
        }, (error) => {
          this.store.dispatch({
            type: customer.actionTypes.CUSTOMER_ERROR, payload: error
          });
          let m = error.message;
          let t = 'Authentication';
          const opt = cloneDeep(this.options);
          const inserted = this.toastrService[types[1]](m, t, opt);
          if (inserted) {
            this.lastInserted.push(inserted.toastId);
          }
        });
    });


  // SOFT DELETE CUSTOMER RECORD
  @Effect({ dispatch: false })
  deleteCustomerRecordConfirm$ = this.actions$
    .ofType('DELETE_CUSTOMER_RECORD_CONFIRM')
    .do((action) => {

    });


  // SOFT DELETE CUSTOMER RECORD
  @Effect({ dispatch: false })
  deleteCustomerRecord$ = this.actions$
    .ofType('DELETE_CUSTOMER_RECORD')
    .withLatestFrom(this.store)
    .do((storeState) => {
      let action = storeState[0];
      let state = storeState[1].customer;
      this.CustomerService
        .deleteCustomerRecord(action.payload)
        .subscribe((result) => {
          if (result.statusCode == '200') {
            let m = 'Customer Deleted Successfully';
            let t = 'Authentication';
            const opt = cloneDeep(this.options);
            const inserted = this.toastrService[types[0]](m,opt);
            if (inserted) {
              this.lastInserted.push(inserted.toastId);
            }
            this.store.dispatch({
              type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
                currentPage: state.currentPage, limit: state.limit,
                role: 'customer',   // @todo fix static value here ..
                filter: state.filter
              }
            });
          }
        }
        , (error) => {
          this.store.dispatch({
            type: customer.actionTypes.CUSTOMER_ERROR, payload: error
          });
          let m = error.message;
          let t = 'Authentication';
          const opt = cloneDeep(this.options);
          const inserted = this.toastrService[types[1]](m, t, opt);
          if (inserted) {
            this.lastInserted.push(inserted.toastId);
          }
        });
    });


  // SOFT DELETE CUSTOMER RECORD
  @Effect({ dispatch: false })
  blockCustomerRecordConfirm$ = this.actions$
    .ofType('BLOCK_THIS_CUSTOMER_CONFIRM')
    .do((action) => {
    });



  // BLOCK THIS CUSTOMER
  @Effect({ dispatch: false })
  blockThisCustomer$ = this.actions$
    .ofType('BLOCK_THIS_CUSTOMER')
    .withLatestFrom(this.store)
    .do((storeState) => {
      let action = storeState[0];
      let state = storeState[1].customer;
      this.CustomerService
        .blockThisCustomer(action.payload)
        .subscribe((result) => {
          let m, t;
          if (result.message == 'Success') {
           
            this.store.dispatch({
              type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
                currentPage: state.currentPage, limit: state.limit,
                role: 'customer',   // @todo fix static value here ..
                filter: state.filter
              }
            });

          
          if (action.payload.isBlocked == true) {
           
            // m = result.message;
            // t = 'Customer is Blocked';
            m = 'Customer Blocked Successfully';
          }
          else {
            // m = result.message;
            m = 'Customer Unblocked Successfully';
          }

          const opt = cloneDeep(this.options);
          const inserted = this.toastrService[types[0]](m,opt);
          if (inserted) {
            this.lastInserted.push(inserted.toastId);
          }
        }
        }, (error) => {
        });
    });

  //search
  @Effect({ dispatch: false })
  SearchCustomer$ = this.actions$
    .ofType('SEARCH_CUSTOMER_DETAIL')
    .withLatestFrom(this.store)
    .do((storeState) => {
      let action = storeState[0];
      let state = storeState[1].customer;
      this.CustomerService
        .getAllCustomers(action.payload)
        .subscribe((result) => {
          if (result.message == 'Success') {


            //console.log("%%%%%%%%%%%%s%%%%%%5",result)
            let filters = (action.payload.filter) ? action.payload.filter : null;
            if (result.data.count == 0) {
              // let m = 'Not Found Any Record' ;
              // let t = '';
              // const opt = cloneDeep(this.options);
              // const inserted = this.toastrService[types[1]](m, t, opt);
              // if (inserted) {
              //   this.lastInserted.push(inserted.toastId);
              // }
              //   this.store.dispatch({
              //   type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
              //     currentPage: state.currentPage, limit: state.limit,
              //     role: 'customer',   // @todo fix static value here ..
              //     filter: state.filter
              //   }
              // });
          

            }
            // creating state payload for next action
            let payload = {
              customers: result.data.users,
              count: result.data.count,
              currentPage: action.payload.currentPage,
              limit: action.payload.limit,
              filter: filters
            };

            //console.log(payload);
            this.store.dispatch(new customer.AppCustomerDetailSuccess(payload));


          }
        }, (error) => {

          this.store.dispatch({
            type: customer.actionTypes.CUSTOMER_ERROR, payload: error
          });
          let m = error.message;
          let t = 'Authentication';
          const opt = cloneDeep(this.options);
          const inserted = this.toastrService[types[1]](m, t, opt);
          if (inserted) {
            this.lastInserted.push(inserted.toastId);
          }

        });
    });



  @Effect({ dispatch: false })
  getAllCustomers$ = this.actions$
    .ofType('APP_GETALL_CUSTOMER')
    .do((action) => {
      this.CustomerService.getAllCustomers(action.payload).subscribe((result) => {
        if (result.message == 'Success') {
          let filters = (action.payload.filter) ? action.payload.filter : null;
          // creating state payload for next action
          let payload = {
            customers: result.data.users,
            count: result.data.count,
            currentPage: action.payload.currentPage,
            limit: action.payload.limit,
            filter: filters
          };
         
          this.store.dispatch(new customer.AppCustomerDetailSuccess(payload));
        }
      }
        , (error) => {
          if (error.statusCode === 401 || error.statusCode === 403) {
            this.store.dispatch({
              type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
            });

          }
     
        }
      );
    });


    @Effect({ dispatch: false })
    getBookingDetails$ = this.actions$
      .ofType('GET_BOOKING_DETAILS')
      .do((action) => {
        this.CustomerService.getBookingDetails(action.payload).subscribe((result) => {
          console.log('booking detail response',result);
            if (result.message == 'Success')
            {
              let payload = {
                bookings: result.data.bookings,
                count: result.data.totalCount,
                currentPage: action.payload.currentPage,
                limit: action.payload.limit,
                // type: action.payload.type
              };
              this.store.dispatch(new customer.GetBookingDetailSuccess(payload));
            }
          }
          , (error) => {
            if(error.statusCode === 401 || error.statusCode === 403)
                  {
                          this.store.dispatch({
                          type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
  
                  }
           
          }
        );
      });


  // GET USER ID
  @Effect({ dispatch: false })
  getUserID$ = this.actions$
    .ofType('USER_ID')
    .do((action) => {
      this.router.navigate(['pages/customer/customer-booking-details']);
    });


  // SOFT DELETE CUSTOMER RECORD
  @Effect({ dispatch: false })
  editCustomerRecordConfirm$ = this.actions$
    .ofType('EDIT_THIS_CUSTOMER_CONFIRM')
    .do((action) => {

    });


  // UPDATE CUSTOMER RECORD
  @Effect({ dispatch: false })
  editThisCustomer$ = this.actions$
    .ofType('EDIT_THIS_CUSTOMER')
    .withLatestFrom(this.store)
    .do((storeState) => {

      let action = storeState[0];
      let state = storeState[1].customer;

      this.CustomerService
        .updateCustomer(action.payload)
        .subscribe((result) => {
          if (result.message == 'Success') {
            let m = 'successfully updated customer';
            let t = 'Authentication';
            const opt = cloneDeep(this.options);
            const inserted = this.toastrService[types[0]](m, t, opt);
            if (inserted) {
              this.lastInserted.push(inserted.toastId);
            }
            this.store.dispatch({
              type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
                currentPage: state.currentPage, limit: state.limit,
                role: 'customer',   // @todo fix static value here ..
                filter: state.filter
              }
            });
            this.store.dispatch({
              type: customer.actionTypes.EDIT_CUSTOMER_SUCCESS,
              payload: result
            });
          }
        }, (error) => {
          this.store.dispatch({
            type: customer.actionTypes.CUSTOMER_ERROR, payload: error
          });
          let m = error.message;
          let t = 'Authentication';
          const opt = cloneDeep(this.options);
          const inserted = this.toastrService[types[1]](m, t, opt);
          if (inserted) {
            this.lastInserted.push(inserted.toastId);
          }
        });
    });


  // error handling
  @Effect({ dispatch: false })
  errorCustomer$ = this.actions$
    .ofType('CUSTOMER_ERROR')
    .do((action) => {
    });

  // on success of add customer
  @Effect({ dispatch: false })
  ADDCustomerSuccess$ = this.actions$
    .ofType('ADD_THIS_CUSTOMER_SUCCESS')
    .do((action) => {
    });

  @Effect({ dispatch: false })
  singleBooking: Observable<Action> = this.actions$
    .ofType('CHANGE_ALL_CUSTOMER')
    .do((action) => {
      this.router.navigate(['pages/customer/allcustomers']);

    });
  // on success of add customer
  @Effect({ dispatch: false })
  EditCustomerSuccess$ = this.actions$
    .ofType('EDIT_CUSTOMER_SUCCESS')
    .do((action) => {
    });


  @Effect({ dispatch: false })
  NewCustomerData$ = this.actions$
    .ofType('NEW_CUSTOMER_DATA')
    .do((action) => {
       this.router.navigate(['pages/customer/singleCustomer']);
    });





  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private router: Router,
    private CustomerService: CustomerService,
    private toastrService: ToastrService
  ) { }

}

