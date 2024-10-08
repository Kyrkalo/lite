import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';


export default class HttpInterceptor {

    private axiosInstance: AxiosInstance;

    constructor(url: string) 
    {
        this.axiosInstance = axios.create({
            baseURL: url,
            timeout: 2000
        });
        this.axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
        this.axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);
    }

    private onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        // var token = `Bearer:`;
        // if (token && config.method != 'OPTIONS') {
        //     config.headers?.setAuthorization(token);
        // }
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