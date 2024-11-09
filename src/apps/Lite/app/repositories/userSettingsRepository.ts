import * as SQLite from 'expo-sqlite';
import { IUserSettings } from '../interfaces/props';

export class UserSettingsRepository {

    constructor() {
        this.initialize();
    }

    private initialize(){
        try{
            const db = SQLite.openDatabaseSync('lcllite.db');
            db.execSync(`CREATE TABLE IF NOT EXISTS userSettings (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        key TEXT UNIQUE, 
                        value TEXT)`);
        }
        catch(e) {
            console.log(e);
        }
    }

    public async save(settings: IUserSettings[]): Promise<boolean> {
        const db = await SQLite.openDatabaseAsync('lcllite.db');
        const statement = await db.prepareAsync(`insert into userSettings (key, value) values ($key, $value)`);
        for(let item of settings) {
            await statement.executeAsync({ $key: item.key, $value: item.value });
        }
        await db.closeAsync();
        return true;
    }

    public async getAll(): Promise<IUserSettings[]> {
        const db = await SQLite.openDatabaseAsync('lcllite.db');
        let result = await db.getAllAsync<IUserSettings>(`select * from userSettings`);
        await db.closeAsync();
        return result;
    }
}