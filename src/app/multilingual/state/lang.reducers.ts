import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
  languageSelected: null,
  language: null,
  resourceBundle: null,

};

export const lang: ActionReducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {


    case 'GET_ALL_LANGUAGE':

      //console.log("hello",state)
      return Object.assign({}, state);

     case 'GET_ALL_LANGUAGE_SUCCESS':
           //console.log("hello",state)
      return Object.assign({}, state, {language: action.payload});

     case 'GET_ALL_RESOURCE_BUNDLE':
           //console.log("hello",state)
      return Object.assign({}, state, {languageSelected: action.payload});


     case 'GET_ALL_RESOURCE_BUNDLE_SUCCESS':
           //console.log("hello",state)
      return Object.assign({}, state, {resourceBundle: action.payload});

    default:
      return state;
  }
};
