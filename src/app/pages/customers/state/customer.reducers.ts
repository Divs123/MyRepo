import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
  errorFound: null,
  customers: null,
  count: 0,
  currentPage: 0,
  limit: 4,
  activeCustomer: null,
  filter: null,  // Filters
  role: 'customer',

};


export const customer: ActionReducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'ADD_THIS_CUSTOMER':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'ADD_THIS_CUSTOMER_SUCCESS':
      return Object.assign({}, state, { addCustomerSuccess: action.payload });

    case 'CUSTOMER_ERROR':
      return Object.assign({}, state, { error: action.payload });


    case 'BLOCK_THIS_CUSTOMER':
      return Object.assign({}, state, { activeCustomer: action.payload });
    //
    case 'SHOW_CUSTOMER_DETAIL':
      return Object.assign({}, state, { activeCustomer: action.payload });

    // confirm Modle shown ....
    case 'DELETE_CUSTOMER_RECORD_CONFIRM':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'DELETE_CUSTOMER_RECORD':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'APP_GETALL_CUSTOMER':
      return Object.assign({}, state);

    case 'APP_CUSTOMER_DETAIL':
      return Object.assign({}, state);

    case 'APP_CUSTOMER_DETAIL_SUCCESS':
      return Object.assign({}, action.payload);




    // case 'APP_CUSTOMER_DETAIL_AFTER_SUCCESS':
    //  return Object.assign({}, state,action.payload)

    case 'APP_GETALL_CUSTOMER_BY_ID':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'APP_GETALL_CUSTOMER_BY_ID_SUCCESS':
      return Object.assign({}, state, { bookingId: action.payload });

    // confirm Modle shown ....
    case 'BLOCK_THIS_CUSTOMER_CONFIRM':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'APP_BLOCK_CUSTOMER_BY_ID':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'APP_BLOCK_CUSTOMER_BY_ID_SUCCESS':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'EDIT_THIS_CUSTOMER_CONFIRM':
      return Object.assign({}, state, { activeCustomer: action.payload });
    case 'EDIT_THIS_CUSTOMER':
      return Object.assign({}, state, { activeCustomer: action.payload });

    case 'EDIT_CUSTOMER_SUCCESS':
      return Object.assign({}, state, { EditCustomerSuccess: action.payload });

    case 'SEARCH_CUSTOMER_DETAIL':
      return Object.assign({}, state, { SearchSuccess: action.payload });

    case 'CHANGE_ALL_CUSTOMER':
      return Object.assign({}, state);

    case 'NEW_CUSTOMER_DATA':
      return Object.assign({}, state, { showCustomerData: action.payload });

    case 'USER_ID':
      return Object.assign({}, state, { getUserId: action.payload });

    case 'GET_BOOKING_DETAIL_SUCCESS':
      return Object.assign({}, state, { getBookingDetailSuccess: action.payload });

    case 'GET_BOOKING_DETAILS':
      return Object.assign({}, state);



    default:
      return state;
  }
};
