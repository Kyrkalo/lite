import * as Keychain from 'react-native-keychain';
import { UserCredentials } from 'react-native-keychain';

export class AuthService {

    constructor() { }

    public hasCredentials = async (): Promise<boolean> => await Keychain.getGenericPassword() ? true : false;

    public login = async (username: string, password: string) => await Keychain.setGenericPassword(username, password);

    public logout = async () => await Keychain.resetGenericPassword();
}