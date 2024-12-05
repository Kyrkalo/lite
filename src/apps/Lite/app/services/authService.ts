import * as SecureStore from 'expo-secure-store';
import HttpInterceptor from '../interceptors/httpInterceptor';
import appConfig from './config';
import ILogin from '../models/ILogin';
import IRegister from '../models/IRegister';
import { Dispatch } from 'react';
import { ActionType } from '../types/actionTypes';

export class AuthService extends HttpInterceptor {
  
    constructor() {
        super(appConfig.api);
    }

    public async login(loginModel: ILogin, dispatch: Dispatch<any>): Promise<boolean | undefined> {
        try {
            const instance = this.getInstance();
            const response = await instance.post('api/auth/login', loginModel);
            
            if (response.status === 200 && response.data) {
                const accessToken = response.data.accessToken ?? '';
                const refreshToken = response.data.refreshToken ?? '';

                await SecureStore.setItemAsync('accessToken', accessToken);
                await SecureStore.setItemAsync('refreshToken', refreshToken);
                
                dispatch({
                    type: ActionType.SET_TOKEN,
                    payload: { access: accessToken, refresh: refreshToken }
                });
                
                return true;
            }
        } catch (error) {
            
            return false;
        }
    }

    public async register(registerModel: IRegister): Promise<boolean> {
        try {
            const instance = this.getInstance();
            const response = await instance.post<any>('api/auth/register', registerModel);

            if (response.status === 200 && response.data) {
                await SecureStore.setItemAsync('accessToken', response.data.accessToken ?? '');
                await SecureStore.setItemAsync('refreshToken', response.data.refreshToken ?? '');
                return true;
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
        return false;
    }

    public async logout(dispatch: Dispatch<any>) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        dispatch({ type: ActionType.CLEAR_USER });
    }

    public async isAuthenticated(): Promise<boolean> {
        const token = await SecureStore.getItemAsync('accessToken');
        return token ? true : false;
    }

    public async refreshToken(): Promise<boolean> {
        try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (!refreshToken) return false;

            const instance = this.getInstance();
            const response = await instance.post('api/auth/refresh', { refreshToken });
            
            if (response.status === 200 && response.data) {
                await SecureStore.setItemAsync('accessToken', response.data.accessToken ?? '');
                return true;
            }
        } catch (error) {
            console.error("Token refresh error:", error);
        }
        return false;
    }
}
