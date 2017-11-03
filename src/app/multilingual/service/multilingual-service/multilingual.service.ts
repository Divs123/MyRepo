import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environment/environment';
import 'rxjs/add/operator/map';
import * as lang from '../../state/lang.actions';
import { Store } from '@ngrx/store';


@Injectable()
export class MultilingualService {
  langSelected;
  constructor(public http: Http, private store: Store < any > )
  {

       this.store
        .select('lang')
        .subscribe((res: any) => {
          
            if (res.languageSelected != null)
            {
                this.langSelected = res.languageSelected;
              

            }
        });


   }


  getAllLanguage(){
      let currentLang= localStorage.getItem('currentLanguage');
    let headers = new Headers({ 'Content-Type': 'application/json', 'content-language': currentLang });
    let options = new RequestOptions({ headers: headers });
    let url =  environment.APP.API_URL + environment.APP.GET_ALL_LANGUAGE;

    return this.http.get(url, options)
      .map((res: Response) => {return res.json(); })
      .catch((error: any) => {

        try {
          return (Observable.throw(error.json()));
        } catch (jsonError) {
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });
  }

  getAllResourceBundle(){
    // console.log("in method",this.langSelected)
    let headers = new Headers({ 'Content-Type': 'application/json', 'content-language': this.langSelected });
    let options = new RequestOptions({ headers: headers });
    let url =  environment.APP.API_URL + environment.APP.GET_ALL_RESOURCE_BUNDLE;

    return this.http.get(url, options)
      .map((res: Response) => {return res.json(); })
      .catch((error: any) => {
        try {
          return (Observable.throw(error.json()));
        } catch (jsonError) {
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });
  }


}
