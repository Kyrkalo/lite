import ISettings from "./ISettings";

export default interface IUser {
    avatar?: string | undefined;
    userName?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    settings?: ISettings |undefined;
}