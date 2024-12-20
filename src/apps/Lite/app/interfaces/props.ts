import { ReturnKeyTypeOptions } from "react-native";
import { Action, ActionType } from "../types/actionTypes";
import { Dispatch } from "react";
import IUser from "../models/IUser";

export interface InputProps {
    name?: string | undefined;
    value?: string | undefined;
    onChange?: (text: string) => void | undefined;
    placeholder?: string | undefined;
    returnKey?: ReturnKeyTypeOptions | undefined; 
    blurOnSubmit?: boolean | undefined;
    error?: string | undefined;
    isRequired?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    editable?: boolean | undefined;
}

export interface PasswordProps {
    name?: string | undefined;
    value?: string | undefined;
    onChange?: (text: string) => void | undefined;
    placeholder?: string | undefined;
    confirmPlaceholder?: string | undefined;
    returnKey?: ReturnKeyTypeOptions | undefined;
    blurOnSubmit?: boolean | undefined;
    error?: string | undefined;
    isRequired?: boolean | undefined;
    min?: number | undefined;
    confirm?: boolean | undefined;
}

export interface Token {
    access?: string | null;
    refresh?: string | null;
}

export interface State {
    user?: IUser | null;
    token: Token | null;
    isLoggedIn: boolean;
}

export interface AddUserAction {
    type: ActionType.ADD_USER;
    payload: IUser;
}

export interface ClearUserAction { 
    type: ActionType.CLEAR_USER; 
} 

export interface SetTokenAction { 
    type: ActionType.SET_TOKEN; payload: Token;
}
 
export interface UpdateTokenAction {
    type: ActionType.UPDATE_TOKEN; payload: Token;
} 

export interface SetIsLoggedInAction { 
    type: ActionType.SET_IS_LOGGED_IN; payload: boolean;
}

export interface GlobalContextProps { 
    state: State; 
    dispatch: Dispatch<Action>;
}

export interface IUserSettings {
    id: number;
    key: string;
    value: string;
}

export interface ILabel {
    title?: string;
    text?: string;
}

export interface IToogle {
    title?: string;
    value?: boolean;
    onChange?: (value: any) => void | undefined;
}