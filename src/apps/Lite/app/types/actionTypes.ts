import { AddUserAction, ClearUserAction, SetTokenAction, UpdateTokenAction, SetIsLoggedInAction } from "../interfaces/props";

export enum ActionType { 
    ADD_USER = 'ADD_USER', 
    CLEAR_USER = 'CLEAR_USER', 
    SET_TOKEN = 'SET_TOKEN', 
    UPDATE_TOKEN = 'UPDATE_TOKEN', 
    SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'
}

export type Action = AddUserAction | ClearUserAction | SetTokenAction | UpdateTokenAction | SetIsLoggedInAction;