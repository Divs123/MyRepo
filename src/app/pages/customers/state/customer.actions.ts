import { Action } from '@ngrx/store';

export const actionTypes = {
  APP_GETALL_CUSTOMER:       'APP_GETALL_CUSTOMER',
  APP_CUSTOMER_DETAIL_SUCCESS:       'APP_CUSTOMER_DETAIL_SUCCESS',
  APP_GETALL_CUSTOMER_BY_ID:   'APP_GETALL_CUSTOMER_BY_ID',
  APP_GETALL_CUSTOMER_BY_ID_SUCCESS:   'APP_GETALL_CUSTOMER_BY_ID_SUCCESS',
  APP_BLOCK_CUSTOMER_BY_ID: 'APP_BLOCK_CUSTOMER_BY_ID',
  APP_BLOCK_CUSTOMER_BY_ID_SUCCESS: 'APP_BLOCK_CUSTOMER_BY_ID_SUCCESS',
  SHOW_CUSTOMER_DETAIL: 'SHOW_CUSTOMER_DETAIL',
  DELETE_CUSTOMER_RECORD: 'DELETE_CUSTOMER_RECORD',
  BLOCK_THIS_CUSTOMER: 'BLOCK_THIS_CUSTOMER',
  ADD_THIS_CUSTOMER: 'ADD_THIS_CUSTOMER',
  ADD_THIS_CUSTOMER_SUCCESS: 'ADD_THIS_CUSTOMER_SUCCESS',
  APP_DELETE_CUSTOMER_BY_ID: 'APP_DELETE_CUSTOMER_BY_ID',
  APP_DELETE_CUSTOMER_BY_ID_SUCCESS: 'APP_DELETE_CUSTOMER_BY_ID_SUCCESS',
  DELETE_CUSTOMER_RECORD_CONFIRM: 'DELETE_CUSTOMER_RECORD_CONFIRM',
  BLOCK_THIS_CUSTOMER_CONFIRM: 'BLOCK_THIS_CUSTOMER_CONFIRM',
  EDIT_THIS_CUSTOMER_CONFIRM: 'EDIT_THIS_CUSTOMER_CONFIRM',
  EDIT_THIS_CUSTOMER: 'EDIT_THIS_CUSTOMER',
  EDIT_CUSTOMER_SUCCESS:'EDIT_CUSTOMER_SUCCESS',
  CUSTOMER_ERROR: 'CUSTOMER_ERROR',
  SEARCH_CUSTOMER_DETAIL:'SEARCH_CUSTOMER_DETAIL',
  CHANGE_ALL_CUSTOMER:'CHANGE_ALL_CUSTOMER',
  NEW_CUSTOMER_DATA:'NEW_CUSTOMER_DATA',
  GET_BOOKING_DETAILS: 'GET_BOOKING_DETAILS',
  USER_ID: 'USER_ID',
  GET_BOOKING_DETAIL_SUCCESS: 'GET_BOOKING_DETAIL_SUCCESS'

};

type credentials = {};

// ADD THIS CUSTOMER
export class AddThisCustomer implements Action {
  type = actionTypes.ADD_THIS_CUSTOMER;
  constructor(public payload: credentials) {}
};
export class SearchCustomer implements Action {
  type = actionTypes.SEARCH_CUSTOMER_DETAIL;
  constructor(public payload: credentials) {}
};


export class AddThisCustomerSuccess implements Action {
  type = actionTypes.ADD_THIS_CUSTOMER_SUCCESS;
  constructor() {}
}
export class ChangeAllCustomer implements Action {
  type = actionTypes.CHANGE_ALL_CUSTOMER;
  constructor(public payload: credentials) { }
}
// BLOCK THIS CUSTOMER
export class BlockThisCustomer implements Action {
  type = actionTypes.BLOCK_THIS_CUSTOMER;
  constructor(public payload: credentials) {}
};

// SOFT REMOVE CUSTOMER RECORD
export class DeleteCustomerRecord implements Action {
  type = actionTypes.DELETE_CUSTOMER_RECORD;
  constructor(public payload: credentials) {}
};

/*export class DeleteCustomerRecordSuccess implements Action {
  type = actionTypes.DELETE_CUSTOMER_RECORD_SUCCESS
  constructor(public payload: credentials) {}
};*/


// GET CUSTOMER DETAIL
export class ShowCustomerDetail implements Action {
  type = actionTypes.SHOW_CUSTOMER_DETAIL;
  constructor(public payload: credentials) {}
};

export class AppGetAllCustomerDetail implements Action {
 
  type = actionTypes.APP_GETALL_CUSTOMER;
  constructor(public payload: credentials) {}
}



export class AppCustomerDetailSuccess implements Action {
  type = actionTypes.APP_CUSTOMER_DETAIL_SUCCESS;
  constructor(public payload: credentials) {}
}



export class AppCustomerDetailById implements Action {
  type = actionTypes.APP_GETALL_CUSTOMER_BY_ID;
  constructor(public payload: credentials) {}
}

export class AppCustomerDetailByIdSuccess implements Action {
  type = actionTypes.APP_GETALL_CUSTOMER_BY_ID_SUCCESS;
  constructor(public payload: credentials) {}
}


export class AppCancelCustomerDetail implements Action {
  type = actionTypes.APP_BLOCK_CUSTOMER_BY_ID;
  constructor() {}
}
export class AppCancelCustomerDetailSuccess implements Action {
  type = actionTypes.APP_BLOCK_CUSTOMER_BY_ID_SUCCESS;
  constructor(public payload: credentials) {}
}


export class AppDeleteCustomerConfirm implements Action {
  type = actionTypes.DELETE_CUSTOMER_RECORD_CONFIRM;
  constructor() {}
}

export class AppBlockCustomerConfirm implements Action {
  type = actionTypes.BLOCK_THIS_CUSTOMER_CONFIRM;
  constructor() {}
}


export class AppEditCustomerConfirm implements Action {
  type = actionTypes.EDIT_THIS_CUSTOMER_CONFIRM;
  constructor() {}
}
export class AppEdiCustomer implements Action {
  type = actionTypes.EDIT_THIS_CUSTOMER;
  constructor() {}
}

export class GetUserId implements Action {
  type = actionTypes.USER_ID;
  constructor(public payload: credentials) {}
}

export class GetBookingDetailSuccess implements Action {
  type = actionTypes.GET_BOOKING_DETAIL_SUCCESS;
  constructor(public payload: credentials) {}
}

export class AppCustomerError implements Action {
  type = actionTypes.CUSTOMER_ERROR;
  constructor() {}
}

export class EditCustomerSuccess implements Action {
  type = actionTypes.EDIT_CUSTOMER_SUCCESS;
  constructor() {}
}

export class NewCustomer implements Action {
  type = actionTypes.NEW_CUSTOMER_DATA;
  constructor(public payload: credentials) {}
}
export class GetBookingDetails implements Action {
  type = actionTypes.GET_BOOKING_DETAILS;
  constructor(public payload: credentials) {}
}


/*export class AppDeleteCustomerDetailSuccess implements Action {
  type = actionTypes.APP_DELETE_CUSTOMER_BY_ID_SUCCESS
  constructor(public payload: credentials) {}
}*/



export type Actions
  =  AppGetAllCustomerDetail
  | AppCustomerDetailSuccess
  | AppCustomerDetailById
  | AppCustomerDetailByIdSuccess
  | AppCancelCustomerDetail
  | AppCancelCustomerDetailSuccess
  | ShowCustomerDetail
  | DeleteCustomerRecord
  | BlockThisCustomer
  | AddThisCustomer
  | AppDeleteCustomerConfirm
  | AppBlockCustomerConfirm
  | AddThisCustomerSuccess
  | AppEditCustomerConfirm
  | AppEdiCustomer
  |ChangeAllCustomer
  | AppCustomerError
  | EditCustomerSuccess
  | NewCustomer
  | GetBookingDetails
  | GetUserId; 



 /* | AppDeleteCustomerDetail
  | AppDeleteCustomerDetailSuccess*/

