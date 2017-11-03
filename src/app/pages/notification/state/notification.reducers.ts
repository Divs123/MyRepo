import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {

  notifications: [],
  count: 0,
  currentPage: 0,
  limit: 0,
  activeNotification: null,
  unreadNotificationCount: 0
};


export const notification: ActionReducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'GET_ALL_NOTIFICATION':

      return Object.assign({}, state, { getAllNotification: action.payload });

    case 'GET_ALL_NOTIFICATION_SUCCESS':

      return Object.assign({}, action.payload);

    case 'READ_NOTIFICATION':

      // return {

      //   ...state, notifications: state.notifications.map(notification => {
      //     return notification._id === action.payload._id ? { ...notification, isRead: action.payload.isRead } :
      //       notification;
      //   })
      // };
    return Object.assign({}, state, {activeNotification: action.payload});

    case 'READ_NOTIFICATION_SUCCESS':

      return Object.assign({}, state, { activeNotificationSuccess: action.payload });

    case 'PUSH_NOTIFICATION':
      return Object.assign({}, ...state, {
        notifications: [action.payload.notifications,...state.notifications],
        unreadNotificationCount: action.payload.unreadNotificationCount
      });

    case 'PUSH_NOTIFICATION_SUCCESS':

      return Object.assign({}, action.payload);
    case 'NEW_NOTIFICATION':

      return Object.assign({}, state, { notifications: action.payload });
    // return Object.assign({}, ...state,{activeNotification : [...state.activeNotification , action.payload]}); 

    case 'SHOW_NOTIFICATION':

      return Object.assign({}, action.payload);

    case 'SHOW_NOTIFICATION_SUCCESS':

      return Object.assign({}, action.payload);



    default:
      return state;
  }
};
