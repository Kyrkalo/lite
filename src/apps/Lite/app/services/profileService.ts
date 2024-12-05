import { Dispatch } from "react";
import HttpInterceptor from "../interceptors/httpInterceptor";
import IUser from "../models/IUser";
import appConfig from "./config";
import { ActionType } from "../types/actionTypes";

export class ProfileService extends HttpInterceptor {

    constructor() {
        super(appConfig.api);
    }
    
    public async get(dispatch: Dispatch<any>): Promise<undefined> {
        try{
            var response = await this.getInstance().get<IUser>('api/user');            
            if (response.status === 200 && response.data) { 
                var profile: IUser = response.data;
                dispatch({
                    type: ActionType.ADD_USER,
                    payload: { profile: profile }
                });

            }
        } catch(error) {
            
        }
    }

    public async update(data: IUser): Promise<any> {
        let instance = this.getInstance();
        var response = await instance.post<IUser>('api/user', data);
        if (response.status === 200 && response.data) { }
    }
}