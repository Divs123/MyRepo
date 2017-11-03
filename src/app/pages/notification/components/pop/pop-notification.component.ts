import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep, random } from 'lodash';
import { ToastrService , ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
@Component({
  selector: 'pop-notification',
  template: ``
})
export class PopNotification {

  public notifications;
  public page = 1;
  public limit = 40;
  public count: number;
  public activeNotification;
  public unreadNotificationCount;

  	private lastInserted: number[] = [];
    private options;

  	constructor(private toastrService: ToastrService,private store: Store<any>) {
	  	this.options = this.toastrService.toastrConfig;

	  	this.pushNotificationFxn();
  	};
  	pushNotificationFxn() {
      this.store
      .select('notification')
      .subscribe((res: any) => {
          // if(res.unreadNotificationCount==res.unreadNotificationCount+1){
          //   console.log('enterrrr');
          // }
          // this.notifications = res.notifications;
          // this.count = res.notificationCount;
          // if(res.notifications && res.notifications.eventType=='NEW_CUSTOM_PACKAGE_REQUEST'){
          //   console.log('got notification');
          //     let m=  res.notifications.message;
          //     let t = 'Notification';
          //     const opt = cloneDeep(this.options);
          //     opt.positionClass = 'toast-bottom-right';
          //     opt.positionClass = 'toast-bottom-right';
          //     const inserted = this.toastrService[types[2]](m,t, opt);
          //     if (inserted) {
          //       this.lastInserted.push(inserted.toastId);
          //     }
          // }
          // this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
          // this.notifications = (res.notifications && res.notifications.length > 0) ? res.notifications : [];
          // this.unreadNotificationCount = res.unreadNotificationCount;
          // this.pageIndex = (res.currentPage - 1) * res.limit;
          // this.count = res.count;
      });
      	// let m = 'Hello .......';
      	// let t = 'Notification';
      	// const opt = cloneDeep(this.options);
      	// opt.positionClass = 'toast-bottom-right';
      	// opt.positionClass = 'toast-bottom-right';
      	// const inserted = this.toastrService[types[2]](m,t, opt);
      	// if (inserted) {
        // 	this.lastInserted.push(inserted.toastId);
      	// }
    }

}
