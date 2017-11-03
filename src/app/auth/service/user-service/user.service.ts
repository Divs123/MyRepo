import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp , JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Action, Store } from '@ngrx/store';
import * as io from 'socket.io-client';
import { environment } from '../../../environment/environment';
import 'rxjs/add/operator/map';
import { ApiService } from '../../../services/api-service/api.service';
import * as app from '../../../state/app.actions';
@Injectable()
export class UserService {
  public onlineFlag;
  authRequired;
  utcOffset;
  constructor(public http: Http, public authHttp: AuthHttp, public jwtHelper: JwtHelper,private apiService: ApiService, private store: Store<any>) {
   }
  // api for login
  login(data){
    
    let url = environment.APP.API_URL + environment.APP.LOGIN_API ;
    this.authRequired = false;
    this.utcOffset = true;
    return this.apiService.postApi(url,data,this.authRequired,this.utcOffset);
   
  }


  // api for logout
  logoutUser(){
     this.authRequired = true;
     this.utcOffset = false;
     let data = '';
     let url = environment.APP.API_URL + environment.APP.LOGOUT_API;
     return this.apiService.postApi(url,data,this.authRequired,this.utcOffset);
    
      
      
  }

  //forgotPassword
    forgotPassword(data){
         this.authRequired = false;
         this.utcOffset = false;
         let url = environment.APP.API_URL+environment.APP.FORGOT_API+'?email='+data.email;
        return this.apiService.getApi(url,this.authRequired,this.utcOffset);
       
    }

  //resetPassword
    resetPassword(data){
        let currentLang= localStorage.getItem('currentLanguage');
        let headers = new Headers({
      'content-language': currentLang,
    });
    let options = new RequestOptions({
      'headers': headers,
    });
      let payload = data;      
      let url = environment.APP.API_URL + environment.APP.RESET_API ;
      this.authRequired = false;
      this.utcOffset = true;
    return this.http.put(url, payload, options)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        try {
           this.onlineFlag = navigator.onLine;
          if(this.onlineFlag == false) {
            this.store.dispatch({
              type: app.actionTypes.APP_INTERNET_NOT_WORKING, payload: error
            });
          }
          else {
            return (Observable.throw(error.json()));
          }          
        } catch (jsonError) {
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });
      
      // return this.apiService.putApi(url,data,this.authRequired,this.utcOffset);
    }
}
