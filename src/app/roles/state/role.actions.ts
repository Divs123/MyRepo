import { Action } from '@ngrx/store';

export const actionTypes = {
 
  AUTH_ROLE: 'AUTH_ROLE',
  AUTH_ROLE_SUCCESS :'AUTH_ROLE_SUCCESS'

};


export class AuthRole implements Action {
  type = actionTypes.AUTH_ROLE;
  constructor(public payload: any) { }
}
export class AuthRoleSuccess implements Action {
  type = actionTypes.AUTH_ROLE_SUCCESS;
  constructor(public payload: any) { }
}

//  LOGOUT


export type Actions
  = 
  | AuthRole
  |AuthRoleSuccess;
