import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import 'rxjs/add/operator/map';
import { ApiService } from '../api-service/api.service';

@Injectable()
export class NotificationService {
    
  authRequired;
  utcOffset;
  public role;
  public isAdminNotification: boolean ;
  constructor(private commonService: CommonService, public http: Http,private apiService: ApiService) { 
      
      
   
  }
  /*getNotifications() {
    let observable = new Observable(observer => {

      this.commonService.getSocketConnection.on('message', (data) => {
        observer.next(data);
      });
      //todo: delete this  return statement
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }*/

  getAllNotifications(payload) {
     
    this.role =localStorage.getItem('Role');
      if(this.role === 'admin')
    {
         this.isAdminNotification = true;
    }
    else{
        this.isAdminNotification=false;
    }
    
    
    let skip = (payload.currentPage - 1) * payload.limit;
    let url = environment.APP.API_URL + environment.APP.GET_ALL_NOTIFICATION + '?limit=' + payload.limit + '&skip=' + skip ;
    this.authRequired = true;
    this.utcOffset = false;
    return this.apiService.getApi(url,this.authRequired,this.utcOffset);
    
  }

  clearAllNotifications() {
  
    let url = environment.APP.API_URL + environment.APP.CLEAR_ALL_NOTIFICATION;
    this.authRequired = true;
    this.utcOffset = false;
    return this.apiService.getApi(url,this.authRequired,this.utcOffset);
   
  }
  readNotification(data) {
  
    if(data.markAllRead)
    {
      data = {markAllAsRead:true};
    }
    else
    {
        data = { notificationID: [data._id],markAllAsRead:false};
    }
    this.authRequired = true;
    this.utcOffset = false;
    let url = environment.APP.API_URL + environment.APP.READ_NOTIFICATION;
    return this.apiService.putApi(url,data,this.authRequired,this.utcOffset);
    
  }
  readAllNotification() {
    let data = { markAllAsRead: true };
    let url = environment.APP.API_URL + environment.APP.READ_NOTIFICATION;
    this.authRequired = true;
    this.utcOffset = false;
    return this.apiService.putApi(url,data,this.authRequired,this.utcOffset);
    
  }

  getUserById(data) {
    
      let url = environment.APP.API_URL + environment.APP.GET_ALL_USER_BY_ID+'?userID='+data;
      this.authRequired = true;
      this.utcOffset = false;
      return this.apiService.getApi(url,this.authRequired,this.utcOffset);
  }

   getBookingById(data) {
      let url = environment.APP.API_URL + environment.APP.GET_BOOKING_BY_ID+'?id='+data;
      this.authRequired = true;
      this.utcOffset = false;
      return this.apiService.getApi(url,this.authRequired,this.utcOffset);
  }
}
