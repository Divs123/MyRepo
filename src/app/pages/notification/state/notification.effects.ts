
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { AuthService } from '../../../auth/service/auth.service';

import * as notification from './notification.actions';
import * as app from '../../../state/app.actions';
// import * as booking from '../../bookings/state/booking.actions';
import * as customer from '../../customers/state/customer.actions';
// import * as driver from '../../driver/state/driver.actions';
// import * as serviceprovider from '../../service-providers/state/serviceprovider.actions';


@Injectable()
export class NotificationEffects {
  notificationData;
  public notifications;
  public page = 1;
  public limit = 40;
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService,
  ) { }



  @Effect({ dispatch: false })
  getAllNotifications$: Observable<any> = this.actions$
    .ofType('GET_ALL_NOTIFICATION')
    .do((action) => {
      this.notificationService.getAllNotifications(action.payload).subscribe((result) => {
        if (result.message == 'Success') {
          let notificationType = (action.payload.type) ? action.payload.currentPage.type : 'all';
          // creating state payload for next action
          if (result && result.data && result.data.notifications && result.data.notifications.length > 0) {

            result.data.notifications = result.data.notifications.map(function (record, index) {


              let currentTime = new Date(record.createdAt);

              let currentOffset = currentTime.getTimezoneOffset();

              let ISTOffset = 330;   // IST offset UTC +5:30

              let createdAt = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
              let minutes = (createdAt.getMinutes() > 9) ? createdAt.getMinutes() : '0' + createdAt.getMinutes();
              record.createdAt = createdAt.getDate() + '-' + (createdAt.getMonth() + 1) + '-' + createdAt.getFullYear() + '' + createdAt.getHours() + ':' + minutes;

              return record;
            });

          }
          let payload = {
            notifications: result.data.notifications,
            count: result.data.notificationCount,
            currentPage: action.payload.currentPage,
            limit: action.payload.limit,
            unreadNotificationCount: result.data.unreadNotificationCount,
            type: notificationType
          };
          this.notificationData = payload;

          this.store.dispatch(new notification.GetAllNotificationSuccessAction(payload));
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
  newNotification: Observable<Action> = this.actions$
    .ofType('NEW_NOTIFICATION')
    .do((action) => {
      this.authService.getSocketConnection().on('notification', (data) => {
        if (data.notification && data.unreadNotificationCount) {

          this.store.dispatch({
            type: notification.actionTypes.PUSH_NOTIFICATION, payload: {
              notifications: data.notification,
              unreadNotificationCount: data.unreadNotificationCount
            }

          });

        }
        // else{


        this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });

        //  this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: {notifications: data.notification,
        //     unreadNotificationCount: data.unreadNotificationCount} });
        // }
      });
    });


  @Effect({ dispatch: false })
  getAllNotificationsSuccess: Observable<Action> = this.actions$
    .ofType('GET_ALL_NOTIFICATION_SUCCESS')
    .do((action) => {
    });





  @Effect({ dispatch: false })
  readNotification: Observable<any> = this.actions$
    .ofType('READ_NOTIFICATION')
    .withLatestFrom(this.store)
    //todo fix here maping value exectly
    .do((storeState) => {
      let action = storeState[0];
      let state = storeState[1].notification;


      //console.log(action.payload);
      this.notificationService.readNotification(action.payload).subscribe((result) => {

        if (result.statusCode === 200) {

          // let index = state.notification.notifications.indexOf(action.payload);
          action.payload.isRead = true;
          // console.log('found index ...' + index);
          // state.notification.notifications[index] = action.payload;
          //state.notification.unreadNotificationCount -= 1;

          this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: action.payload });

          this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: state.currentPage, limit: state.limit } });

          // this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION_SUCCESS, payload: state });

          //  // if( !action.payload.markAllRead )
          //  // {
          //      this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: action.payload });
          // // }

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
  pushNotificationsSuccess: Observable<Action> = this.actions$
    .ofType('PUSH_NOTIFICATION')
    .do((action) => {

    });


  // @Effect({ dispatch: false })
  // showNotifications: Observable<Action> = this.actions$
  //   .ofType('SHOW_NOTIFICATION')
  //   .do((action) => {
  //     if (action.payload.eventType === 'NEW_CUSTOM_PACKAGE_REQUEST') {
  //       this.notificationService.getUserById(action.payload.eventID).subscribe((result) => {
  //         if (result.statusCode === 200) {
  //           this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION_SUCCESS, payload: this.notificationData });
  //           result.customepkgBtn=true;
  //           this.store.dispatch({ type: driver.actionTypes.NEW_DRIVER_DATA, payload: result });
  //           //  localStorage.setItem('NewBooking', JSON.stringify(result.data[0]));
  //           this.router.navigate(['pages/driver/singleDriver']);

  //         };
  //       }
  //         , (error) => {

  //           if (error.statusCode === 401 || error.statusCode === 403) {
  //             this.store.dispatch({
  //               type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
  //             });
  //           }
  //         }
  //       );
  //     }
  //     else if (action.payload.eventType === 'BOOKING_STATUS_CHANGE') {
  //       this.notificationService.getUserById(action.payload.eventID).subscribe((result) => {
  //         if (result.statusCode === 200) {
  //           this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION_SUCCESS, payload: this.notificationData });
  //           // this.store.dispatch({ type: driver.actionTypes.NEW_DRIVER_DATA, payload: result });
  //           //  localStorage.setItem('NewBooking', JSON.stringify(result.data[0]));
  //           // this.router.navigate(['pages/driver/singleDriver']);

  //         };
  //       }
  //         , (error) => {

  //           if (error.statusCode === 401 || error.statusCode === 403) {
  //             this.store.dispatch({
  //               type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
  //             });

  //           }

  //         }
  //       );
  //     }
  //     else {
  //       this.notificationService.getUserById(action.payload.eventID).subscribe((result) => {
  //         if (result.statusCode === 200) {
  //           this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION_SUCCESS, payload: this.notificationData });
  //           switch (action.payload.eventType) {
  //             case 'NEW_CUSTOMER_REGISTER':
  //               // localStorage.setItem('NewCustomer', JSON.stringify(result.data));      
  //               this.store.dispatch({ type: customer.actionTypes.NEW_CUSTOMER_DATA, payload: result });
  //               this.router.navigate(['pages/customer/singleCustomer']);
  //               break;
  //             case 'NEW_DRIVER_REGISTER':
  //               result.customepkgBtn=false;
  //               this.store.dispatch({ type: driver.actionTypes.NEW_DRIVER_DATA, payload: result });
  //               this.router.navigate(['pages/driver/singleDriver']);
  //               break;
  //             default:
  //               break;
  //           }
  //         };
  //       }
  //         , (error) => {

  //           if (error.statusCode === 401 || error.statusCode === 403) {
  //             this.store.dispatch({
  //               type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
  //             });

  //           }

  //         }
  //       );
  //     }

  //   });
  // @Effect({ dispatch: false })
  // showNotificationsSuccess: Observable<Action> = this.actions$
  //   .ofType('PUSH_NOTIFICATION')
  //   .do((action) => {
  //     // console.log('Success fully executed socket push  ');
  //   });
}


