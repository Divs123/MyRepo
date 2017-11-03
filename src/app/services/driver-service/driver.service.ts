import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';
import * as role from '../../roles/state/role.actions';
import { ApiService } from '../api-service/api.service';

@Injectable()
export class DriverService {
    public roles;
  authRequired;
  utcOffset;
  constructor(public http: Http, private apiService: ApiService, private store: Store<any>) {
         this.store
      .select('role')
      .subscribe((res: any) => {      
        this.roles = res;
      });
  }



    getAllDriver(payload){
      this.authRequired = true;
      this.utcOffset = false;
      let url;
            let skip;
            if(payload.skip==0){
               skip=0;
               payload.currentPage=1;
            }
            else{ 
               skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
            }

        url=environment.APP.API_URL+environment.APP.GET_ALL_USER+'?role='+payload.role+'&limit='+payload.limit+'&skip='+skip;
        for(let i = 0; i < payload.filter.length; i++) {
          if (payload.filter[i].id == 'isAdminVerified')
          {
            url += '&isAdminVerified=' + payload.filter[i].value;
          }
          if (payload.filter[i].id == 'isDeleted')
          {
            url += '&isDeleted=' + payload.filter[i].value;
          }

          if (payload.filter[i].id == 'isBlocked')
          {
            url += '&isBlocked=' + payload.filter[i].value;
          }
        }

          if(payload.driver && payload.driver!= null)
          {
            url+='&searchUser='+payload.driver;
          }

      return this.apiService.getApi(url,this.authRequired,this.utcOffset);
  };
addThisDriver(payload) {
    
    // URL
    let url = environment.APP.API_URL + environment.APP.ADD_DRIVER;
    this.authRequired = true;
    this.utcOffset = true;
    return this.apiService.postApi(url,payload,this.authRequired,this.utcOffset);
   
  };
  blockThisDriver(payload) {
    this.authRequired = true;
    this.utcOffset = false;
    let url = environment.APP.API_URL + environment.APP.BLOCK_USER_BY_ID;
    // HTTP REQUEST
    return this.apiService.putApi(url,payload,this.authRequired,this.utcOffset);
  };

  deleteDriverRecord(payload) {
    this.authRequired = true;
    this.utcOffset = false;
    let params = new FormData();
    params.append('userID', payload.userID);
    let url = environment.APP.API_URL + environment.APP.DELETE_USER_BY_ID;
     return this.apiService.deleteApi(url,payload,this.authRequired,this.utcOffset);

  };
updateDriver(payload) {
    let url = environment.APP.API_URL + environment.APP.EDIT_DRIVER_BY_ID_SUCCESS;
    this.authRequired = true;
    this.utcOffset = false;
    return this.apiService.putApi(url,payload,this.authRequired,this.utcOffset);
  };

  verifyDriverRecord(payload) {   
    // URL
    let url = environment.APP.API_URL + environment.APP.VERIFY_DRIVER_BY_ID_SUCCESS;
    this.authRequired = true;
    this.utcOffset = false;
    return this.apiService.putApi(url,payload,this.authRequired,this.utcOffset);
  };

}



