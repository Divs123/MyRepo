import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { environment } from '../../environment/environment';
import * as app from '../../state/app.actions';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  token;
  headerToken;
  headers;
  options;

  public onlineFlag;

  constructor(public http: Http, private store: Store<any>) {


  }


  getToken(authRequired, utcOffset) {
    let currentLang= localStorage.getItem('currentLanguage');
    // this.headers = new Headers({ 'Content-Type': 'application/json', 'content-language': currentLang });
    // this.headers = new Headers({ 'Content-Type': 'application/json', 'content-language': 'en' });
    this.headers = new Headers({'content-language': 'en' });
    this.token = localStorage.getItem('token');
    this.headerToken = 'Bearer ' + this.token;
    if (authRequired === true && utcOffset === false) {
      this.headers = this.headers ? this.headers : {};
      this.headers.set('Authorization', this.headerToken);
      if (this.headers.has('utcoffset')) {
        this.headers.delete('utcoffset');
      }

    }
    else if (authRequired === true && utcOffset === true) {
      this.headers.set('Authorization', this.headerToken);
      this.headers.set('utcoffset', '330');

    }
    else if (authRequired === false && utcOffset === false) {
      if (this.headers.has('Authorization')) {
        this.headers.delete('Authorization');
      }
      if (this.headers.has('utcoffset')) {
        this.headers.delete('utcoffset');
      }
    }
    else if (authRequired === false && utcOffset === true) {
      if (this.headers.has('Authorization')) {
        this.headers.delete('Authorization');
      }
      this.headers.set('utcoffset', '330');
      //  this.headers.set('Content-Type','application/x-www-form-urlencoded')
      //  this.headers.set('Accept','application/json')
    }



    //console.log(this.headers,'__')
    ///if(utc)
    this.options = new RequestOptions({ headers: this.headers });
    //console.log(this.options)
    return this.options;
  }



  getApi(url, authRequired, utcOffset) {

    this.onlineFlag = navigator.onLine;
    return this.http.get(url, this.getToken(authRequired, utcOffset))
      .map((res: Response) => {
        return res.json();
      })

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
          // If the error couldn't be parsed as JSON data
          // then it's possible the API is down or something
          // went wrong with the parsing of the successful
          // response. In any case, to keep things simple,
          // we'll just create a minimum representation of
          // a parsed error.
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });

  }
  postApi(url, data, authRequired, utcOffset) {
    console.log('data',data);
    return this.http.post(url, data, this.getToken(authRequired, utcOffset))
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
          // If the error couldne parsed as JSON data
          // then it's possible the API is down or something
          // went wrong with the parsing of the successful
          // response. In any case, to keep things simple,
          // we'll just create a minimum representation of
          // a parsed error.
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });

  }


  deleteApi(url, data, authRequired, utcOffset) {
    this.getToken(authRequired, utcOffset);
    this.options = new RequestOptions({
      'headers': this.headers,
      'body': { 'userID': data.userID }
    });

    //console.log("data in delete.....................................",data)
    return this.http.delete(url, this.options)
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
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });
  }

  deletePackageApi(url, data, authRequired, utcOffset) {
    console.log('data in service',data);
    this.getToken(authRequired, utcOffset);
    this.options = new RequestOptions({
      'headers': this.headers,
      'body': { 'packageID': data.packageID }
    });

    //console.log("data in delete.....................................",data)
    return this.http.delete(url, this.options)
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
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });
  }

  deleteFaqApi(url, data, authRequired, utcOffset) {
    console.log('delete faq in service',data);
    this.getToken(authRequired, utcOffset);
    this.options = new RequestOptions({
      'headers': this.headers,
      'body': { 'faqId': data.faqId }
    });

    //console.log("data in delete.....................................",data)
    return this.http.delete(url, this.options)
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
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });
  }


  deletePromocodeApi(url, data, authRequired, utcOffset) {
    console.log('delete promo in service',data);
    this.getToken(authRequired, utcOffset);
    this.options = new RequestOptions({
      'headers': this.headers,
      'body': { 'promoPattern': data.promoPattern }
    });

    //console.log("data in delete.....................................",data)
    return this.http.delete(url, this.options)
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
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });
  }



  putApi(url, data, authRequired, utcOffset) {
    return this.http.put(url, data, this.getToken(authRequired, utcOffset))
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
          // If the error couldn't be parsed as JSON data
          // then it's possible the API is down or something
          // went wrong with the parsing of the successful
          // response. In any case, to keep things simple,
          // we'll just create a minimum representation of
          // a parsed error.
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });

  }

}