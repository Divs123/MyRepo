import { Action } from '@ngrx/store';

export const actionType={
    GET_ALL_DRIVERS: 'GET_ALL_DRIVERS'
}

export class GetAllDrivers implements Action{
    type= actionType.GET_ALL_DRIVERS;
    constructor(){}
}

export type Actions=GetAllDrivers;