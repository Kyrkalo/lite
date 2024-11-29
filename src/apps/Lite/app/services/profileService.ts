import HttpInterceptor from "../interceptors/httpInterceptor";
import { IUser } from "../models/IUser";
import appConfig from "./config";

export class ProfileService extends HttpInterceptor {

    constructor() {
        super(appConfig.api);
    }
    
    public async get(): Promise<IUser> {
        var profile: IUser = { };    
        try{
            var response = await this.getInstance().get<IUser>('api/user');            
            if (response.status === 200 && response.data) { 
                profile = response.data;
            }
        } catch(error) {
            console.log(error)
        }
        return profile;
    }

    public async update(data: IUser): Promise<any> {
        let instance = this.getInstance();
        var response = await instance.post<IUser>('api/user', data);
        if (response.status === 200 && response.data) { }        
    }
}