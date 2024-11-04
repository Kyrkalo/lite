import * as Keychain from 'react-native-keychain';
import HttpInterceptor from '../interceptors/httpInterceptor';
import appConfig from './config';
import * as SecureStore from 'expo-secure-store';
import { Token } from '../models/token';
import LoginModel from '../models/loginModel';
import RegisterModel from '../models/registerModel';
import { User } from '../interfaces/props';

export class AuthService extends HttpInterceptor {

    constructor() { super(appConfig.api); }

    public hasCredentials = async (): Promise<boolean> => await Keychain.getGenericPassword() ? true : false;

    public async login(loginModel: LoginModel): Promise<boolean> {
        try
        {
            let instance = this.getInstance();
            var response = await instance.post('api/auth/login', loginModel);
            
            if (response.status === 200 && response.data) {
                await SecureStore.setItemAsync('accessToken', response.data.accessToken ?? '');
                await SecureStore.setItemAsync('refreshToken', response.data.refreshToken ?? '');
                return true;
            }
        }
        catch(error)
        {
            console.log(error);
        }
        return false;
    }

    public async register(registerModel: RegisterModel): Promise<boolean> {
        let instance = this.getInstance();
        let response = await instance.post<Token>('api/auth/register', registerModel);
        if (response.status){
            await SecureStore.setItemAsync('accessToken', response.data.accessToken ?? '')
            await SecureStore.setItemAsync('refreshToken', response.data.refreshToken ?? '')
            return true;
        }
        return false;
    }

    public logout = async () => await Keychain.resetGenericPassword();
}
