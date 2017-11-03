import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
  role: null,
  roleDetail: null

};
// var initialStateLocalStorage  =Object.assign(initialState, localStorage.getItem("Role") ?  localStorage.getItem("Role") : {})


export const role: ActionReducer<any> = (state = initialState , action: Action) => {

  switch (action.type) {

    case 'AUTH_ROLE':
    return Object.assign({}, state,{role: action.payload });
     
    case 'AUTH_ROLE_SUCCESS':
     return Object.assign({}, state, {roleDetail: action.payload });
    
    //console.log("hello",state)
    // return Object.assign({}, ...state, action.payload);



    default:
      return state;
  }
};
