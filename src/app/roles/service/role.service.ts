import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environment/environment';
import 'rxjs/add/operator/map';
// import * as lang from '../../state/lang.actions';
import { Store } from '@ngrx/store';
import * as app from '../../state/app.actions';
import * as role from '../state/role.actions';


@Injectable()
export class RoleService {
  // langSelected;
  public onlineFlag;
  constructor(public http: Http, private store: Store < any > )
  {

      //  this.store
      //   .select('lang')
      //   .subscribe((res: any) => {
      //       //console.log(res)
      //       if (res.languageSelected != null)
      //       {
      //           this.langSelected = res.languageSelected;
      //           //console.log(this.langSelected)

      //       }
      //   });


   }
   setRole(data){
     let url;         
     if(data.role == 'admin')
     {
       url = 'assets/roles_admin.json';
     }
     else 
     {
       url = 'assets/roles_serviceProvider.json';
     }
       

  return this.http.get(url)
    .map((res: Response) => res.json())
      .catch((error: any) => {
        try {
           this.onlineFlag = navigator.onLine;
          if (this.onlineFlag == false) {
          
            this.store.dispatch({
              type: app.actionTypes.APP_INTERNET_NOT_WORKING, payload: error
            });

          }


          else {

            return (Observable.throw(error.json()));

          }
          
        } catch (jsonError) {
          // let minimumViableError = {
          //   success: false
          // };
          // return (Observable.throw(minimumViableError));
        }
      });
}


}
