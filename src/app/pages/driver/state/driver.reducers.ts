import { Action, ActionReducer } from '@ngrx/store';

export const driverreducer: ActionReducer<any>=(state,action: Action)=>{
    switch(action.type){
        case 'GET_ALL_DRIVERS':
        return Object.assign({},state);
        
        default:
        return state;
    }
}