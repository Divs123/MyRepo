import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerService {
  authRequired;
  utcOffset;
  constructor(public http: Http,private apiService: ApiService) {

  }

  addThisCustomer(payload) {
    this.authRequired = true;
    this.utcOffset = true;
    // URL
    let url = environment.APP.API_URL + environment.APP.ADD_CUSTOMER;
    return this.apiService.postApi(url,payload,this.authRequired,this.utcOffset);
  }

    getAllCustomers(payload){
      let url;
      let skip;
      if(payload.skip==0){
         skip=0;
         payload.currentPage=1;
      }
      else{ 
         skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
      }
   
     
      //if(payload.value == 'all'){

      url = environment.APP.API_URL + environment.APP.GET_ALL_USER + '?role=' + payload.role + '&limit=' + payload.limit + '&skip=' + skip;
      //}

     
      for (let i = 0; i < payload.filter.length; i++) {
        //if (payload.filter[i]  && payload.filter[i] != null ){
        if (payload.filter[i].id == 'isAdminVerified') {
          url += '&isAdminVerified=' + payload.filter[i].value;
        }
        if (payload.filter[i].id == 'isDeleted') {
          url += '&isDeleted=' + payload.filter[i].value;
        }

        if (payload.filter[i].id == 'isBlocked') {
          url += '&isBlocked=' + payload.filter[i].value;
        }
        //}
      }
      if (payload.customer && payload.customer != null) {
      
        url += '&searchUser=' + payload.customer;
      }




      this.authRequired = true;
      this.utcOffset = false;
      return this.apiService.getApi(url, this.authRequired, this.utcOffset);
  };
  updateCustomer(payload) {
    this.authRequired = true;
    this.utcOffset = false;
    // URL
    let url = environment.APP.API_URL + environment.APP.EDIT_USER_BY_ID_SUCCESS;
    return this.apiService.putApi(url,payload,this.authRequired,this.utcOffset);
  };




      deleteCustomerRecord(payload){
        this.authRequired = true;
        this.utcOffset = false;
        // PARAMS
        let params = new FormData();
            params.append('userID', payload.userID);
        let url = environment.APP.API_URL + environment.APP.DELETE_USER_BY_ID;
        return this.apiService.deleteApi(url,payload,this.authRequired,this.utcOffset);

      };

      blockThisCustomer(payload){
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.BLOCK_USER_BY_ID;
        return this.apiService.putApi(url,payload,this.authRequired,this.utcOffset);
      };

      getBookingDetails(payload){
     
        let url;
        let skip;
        if(payload.skip==0){
           skip=0;
           payload.currentPage=1;
        }
        else{ 
           skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
        }
     
        url = environment.APP.API_URL + environment.APP.GET_BOOKING_DETAILS  + '?userID=' + payload.userID + '&limit=' + payload.limit + '&skip=' + skip + '&filter=' + payload.filter;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
      }


}
