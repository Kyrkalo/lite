import HttpInterceptor from "../interceptors/httpInterceptor";
import { ProfileModel } from "../models/profileModel";
import appConfig from "./config";

export class ProfileService extends HttpInterceptor {

    constructor() {
        super(appConfig.api);
    }
    
    public async get(): Promise<ProfileModel> {

        let instance = this.getInstance();

        var response = await instance.get<ProfileModel>('api/user');
        
        if (response.status === 200 && response.data) { }

        return response.data;
    }

    public async update(data: ProfileModel): Promise<any> {
        let instance = this.getInstance();
        var response = await instance.post<ProfileModel>('api/user', data);
        if (response.status === 200 && response.data) { }        
    }
}