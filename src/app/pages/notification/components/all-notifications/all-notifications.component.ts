
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as lang from '../../../../multilingual/state/lang.actions';
import { Language } from '../../../../multilingual/model/lang.model.ts';
import * as notification from '../../state/notification.actions';

import 'style-loader!./all-notifications.scss';

@Component({
    selector: 'all-notifications',
    templateUrl: 'all-notifications.html',
})
export class AllNotifications implements OnDestroy{
    subscription: Subscription;
    language = new Language();
    public notifications;
    public page = 1;
    public limit = 20;
    public pageIndex;
    public count: number;
    public activeNotification;
    public unreadNotificationCount;

    constructor(private store: Store<any>) {

        this.subscription= this.store
            .select('notification')
            .subscribe((res: any) => {
                this.notifications = res.notifications;
                this.count = res.notificationCount;
                // this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
                this.notifications = (res.notifications && res.notifications.length > 0) ? res.notifications : [];
                this.unreadNotificationCount = res.unreadNotificationCount;
                this.pageIndex = (res.currentPage - 1) * res.limit;
                this.count = res.count;
            });

        this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });

    }



    pageChanged(page) {
        this.page = page;
        this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
        // this.store.dispatch({ type: booking.actionTypes.APP_GETALL_BOOKING, payload: {currentPage:this.page,limit:this.limit,type:"all"} })
    }




    read(data) {

        if (!data.isRead) {
            this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
            this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
        } else {
            this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });

        }

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
      }
    /* cancelById(data){
      //this.store.dispatch({ type: booking.actionTypes.APP_CANCEL_BOOKING_BY_ID, payload: {booking:data} });
      this.store.dispatch({ type: booking.actionTypes.APP_CANCEL_BOOKING_BY_ID, payload: {booking:data} });
      const activeModal = this.modalService.open(CancelBookingModal, {size: 'sm'});
      activeModal.componentInstance.modalHeader = 'Large Modal';
  
    }
  
    showById(data){
      this.store.dispatch({ type: booking.actionTypes.APP_GETALL_BOOKING_BY_ID, payload: {booking:data} });
      //console.log(content)
      //this.open(content);
      this.lgModalShow();
    }
  
  
  
  
    lgModalShow() {
      const activeModal = this.modalService.open(BookingModal, {size: 'lg'});
      activeModal.componentInstance.modalHeader = 'Large Modal';
    }*/
}
