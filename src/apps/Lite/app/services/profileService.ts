export default interface IProfileData {
    avatar: string;
    username: string;
    phone: string;
}

export class ProfileService {
    get(): IProfileData {
        let profile: IProfileData = {
            avatar: '../../assets/logo.png',
            phone: '+13379991432',
            username: '@fake.username'
        };
        return profile;
    }
}