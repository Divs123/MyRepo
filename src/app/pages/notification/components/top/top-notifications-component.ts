import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../auth/service/auth.service';
import { NotificationService } from '../../../../services/notification-service';
import * as lang from '../../../../multilingual/state/lang.actions';
import { Language } from '../../../../multilingual/model/lang.model.ts';
//import { Observable } from 'rxjs/Rx';

//import {Notification} from './baMsgCenter.service';

import * as notification from '../../state/notification.actions';

@Component({
  selector: 'top-notification',
  styleUrls: ['top-notifications.scss'],
  template: `
   <ul class="top-notification  clearfix">
  <li class="dropdown">
    <a href class="dropdown-toggle" id="msg-dd1" data-toggle="dropdown" aria-expanded="false">
     <i class="fa fa-bell-o"></i><span>{{ unreadNotificationCount }}</span>

      <div class="notification-ring"></div>
    </a>

    <div class="top-dropdown-menu dropdown-menu" aria-labelledby="msg-dd1">
      <i class="dropdown-arr"></i>

      <div class="header clearfix">
        <strong>Notifications</strong>
        <a  (click)="readAllNotification({markAllRead:true})">Mark All As Read </a>
      
      </div>
      <div class="msg-list">
        <a *ngFor="let msg of notifications" class="clearfix" (click)="read(msg)" [ngClass]="{'text-muted': msg.isRead,'text-primary': !msg.isRead}">
          <div class="msg-area">
            <div>{{ msg.eventType }}</div>
            <span>{{ msg.createdAt }}</span>
          </div>
        </a>
      </div>
      <a routerLink="notification/all-notifications">See All Notifications</a>
    </div>
  </li>

</ul>
  `
})
export class TopNotifications implements OnDestroy{
  subscription: Subscription;
  language = new Language();
  public notifications;
  public page = 1;
  public limit = 40;
  public count: number;
  public activeNotification;
  public unreadNotificationCount;

  constructor(private store: Store<any>,public authservice: AuthService) {
      this.subscription= this.store
      .select('notification')
      .subscribe((res: any) => {    
        // this.notifications = this.notifications.map(function (record,index) {
        //    record.createdAt = new Date(record.createdAt).toLocaleDateString()
        //   return record; 
        // })
        this.count = res.notificationCount;
        this.notifications = (res.notifications && res.notifications.length >0) ? res.notifications : [];
       
        this.unreadNotificationCount = res.unreadNotificationCount;
     
      });

    if(this.authservice.getSocketConnection()){
       this.store.dispatch({ type: notification.actionTypes.NEW_NOTIFICATION, payload: {notifications: this.notifications} });
     
    }

    this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: {currentPage: this.page, limit: this.limit} });

  }

  readAllNotification(data){

    if (!data.isRead)
    this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });   
    this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: {currentPage: this.page, limit: this.limit} });
  }

  read(data){
    if (!data.isRead){
   
    this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
    }
    else
    {
     
      this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
    }
  }


ngOnDestroy() {
  this.subscription.unsubscribe();
}

}

