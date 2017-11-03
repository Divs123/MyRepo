import { get } from 'lodash';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MultilingualService } from '../service/multilingual-service/multilingual.service';


//import { UiService } from '@colmena/colmena-angular-ui'
///import { UserApi } from '@lb-sdk'


import * as lang from './lang.actions';

@Injectable()
export class LangEffects {

  @Effect({ dispatch: false })
  getAllLang: Observable<Action> = this.actions$
    .ofType(lang.actionTypes.GET_ALL_LANGUAGE)
     .do((action) => {
    this.multilingualService.getAllLanguage().subscribe((result) => {
           //console.log()
            if (result.message === 'Success') {
             
              let arabicId=result.data[1]._id;
              let engId=result.data[2]._id;
              localStorage.setItem('arId',arabicId);
              localStorage.setItem('enId',engId);
               this.store.dispatch({
                type: lang.actionTypes.GET_ALL_LANGUAGE_SUCCESS,
                payload: result.data
            });

            }
        }
        , (error) => {
          console.log(error);
        }
      );

     });

     @Effect({ dispatch: false })
  getAllLangSuccess: Observable<Action> = this.actions$
    .ofType(lang.actionTypes.GET_ALL_LANGUAGE_SUCCESS)
     .do((action) => {
     

     });

   @Effect({ dispatch: false })
  getAllResourceBundle: Observable<Action> = this.actions$
    .ofType(lang.actionTypes.GET_ALL_RESOURCE_BUNDLE)
     .do((action) => {
      this.multilingualService.getAllResourceBundle().subscribe((result) => {
           //console.log(result)
             if (result.statusCode === 200) {

               this.store.dispatch({
                type: lang.actionTypes.GET_ALL_RESOURCE_BUNDLE_SUCCESS,
                payload: result.data
            });

            }
        }
        , (error) => {
          // console.log(error);
        }
      );

     });

     @Effect({ dispatch: false })
  getAllResourceBundleSuccess: Observable<Action> = this.actions$
    .ofType(lang.actionTypes.GET_ALL_RESOURCE_BUNDLE_SUCCESS)
     .do((action) => {
      //console.log("action fired.......................")

     });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private router: Router,
    private multilingualService: MultilingualService
  ) {
  }

}

