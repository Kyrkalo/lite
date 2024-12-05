import { State } from "../interfaces/props";
import { Action, ActionType } from "../types/actionTypes";


export const initialState: State = {
    user: null,
    token: null,
    isLoggedIn: false,
};

export const reducer = (state: State = initialState, action: Action): State => {
    
    switch (action.type) {
        case ActionType.ADD_USER:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            };
        case ActionType.CLEAR_USER:
            return {
                ...state,
                user: null,
                token: null,
                isLoggedIn: false,
            };
        case ActionType.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case ActionType.UPDATE_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case ActionType.SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
}; 