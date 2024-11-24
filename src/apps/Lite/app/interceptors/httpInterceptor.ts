import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

export default class HttpInterceptor {

    private axiosInstance: AxiosInstance;

    constructor(url: string) 
    {
        this.axiosInstance = axios.create({
            baseURL: url
        });
        this.axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
        this.axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);
    }

    private onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const token = SecureStore.getItem('accessToken');
        if (token) {
            config.headers?.setAuthorization(`Bearer ${token}`);
        }
        return config;
    }

    private onRequestError(error: AxiosError): Promise<AxiosError> {
        
        return Promise.reject(error);
    }

    private onResponse(response: AxiosResponse): AxiosResponse {
        return response;
    }
    
    private onResponseError (error: AxiosError): Promise<AxiosError>{
        
        return Promise.reject(error);
    }

    public getInstance = () => this.axiosInstance;
}