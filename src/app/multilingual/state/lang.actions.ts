import { Action } from '@ngrx/store';

export const actionTypes = {
  GET_ALL_LANGUAGE:                 'GET_ALL_LANGUAGE',
  GET_ALL_LANGUAGE_SUCCESS:          'GET_ALL_LANGUAGE_SUCCESS',
  GET_ALL_RESOURCE_BUNDLE:           'GET_ALL_RESOURCE_BUNDLE',
  GET_ALL_RESOURCE_BUNDLE_SUCCESS:   'GET_ALL_RESOURCE_BUNDLE_SUCCESS'
};

type credentials = {

};

/*for getting all languages */
export class LangGetAll implements Action {
  type = actionTypes.GET_ALL_LANGUAGE;


  constructor() {  }

}


export class LangGetAllSuccess implements Action {
  type = actionTypes.GET_ALL_LANGUAGE_SUCCESS;


  constructor(public payload: credentials) {  }

}



export class GetAllResourceBundle implements Action {
  type = actionTypes.GET_ALL_RESOURCE_BUNDLE;
  constructor(public payload: credentials) {  }

}

export class GetAllResourceBundleSuccess implements Action {
  type = actionTypes.GET_ALL_RESOURCE_BUNDLE_SUCCESS;
  constructor(public payload: credentials) {  }

}


export type Actions
   = LangGetAll
   | LangGetAllSuccess
   | GetAllResourceBundle
   | GetAllResourceBundleSuccess;

