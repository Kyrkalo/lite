import * as Keychain from 'react-native-keychain';
import HttpInterceptor from '../interceptors/httpInterceptor';
import appConfig from './config';
import sslPinning from 'react-native-ssl-pinning';

export class AuthService extends HttpInterceptor {

    //certificate = require('./assets/certificate.cer');

    constructor() {
        super(appConfig.api);
    }

    public hasCredentials = async (): Promise<boolean> => await Keychain.getGenericPassword() ? true : false;

    public async login(username: string, password: string) {
        let instance = this.getInstance();
        await instance.post('auth/login', {userName: username, password: password});
        await Keychain.setGenericPassword(username, password);
    }

    public logout = async () => await Keychain.resetGenericPassword();
}
