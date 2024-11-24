import HttpInterceptor from "../interceptors/httpInterceptor";
import { ProfileModel } from "../models/profileModel";
import appConfig from "./config";

export class ProfileService extends HttpInterceptor {

    constructor() {
        super(appConfig.api);
    }
    
    public async get(): Promise<ProfileModel> {
        var profile: ProfileModel = { };    
        try{
            var response = await this.getInstance().get<ProfileModel>('api/user');            
            if (response.status === 200 && response.data) { 
                profile = response.data;
            }
        } catch(error) {
            console.log(error)
        }
        return profile;
    }

    public async update(data: ProfileModel): Promise<any> {
        let instance = this.getInstance();
        var response = await instance.post<ProfileModel>('api/user', data);
        if (response.status === 200 && response.data) { }        
    }
}