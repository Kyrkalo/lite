import * as SQLite from 'expo-sqlite';



export interface IContact {
    id?: number;
    username: string;
    photo: string;
}

export class ContactRepository {  
    
    constructor() {
        this.initialize();
    }

    private initialize(){
        try{
            const db = SQLite.openDatabaseSync('lcllite.db');
            db.execSync(`CREATE TABLE IF NOT EXISTS contacts (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        username TEXT UNIQUE, 
                        photo TEXT)`);
                        console.log(1);
        }
        catch(e) {
            console.log(e);
        }
    }

    public async Save(contact: IContact): Promise<boolean> {
        const db = await SQLite.openDatabaseAsync('lcllite.db');
        const statement = await db.prepareAsync(`insert into contacts (username, photo) values ($username, $photo)`);
        await statement.executeAsync({ $username: contact.username, $photo: contact.photo });
        await db.closeAsync();
        return true;
    }

    public async Fetch(): Promise<IContact[]> {
        const db = await SQLite.openDatabaseAsync('lcllite.db');
        const result = await db.getAllAsync<IContact>(`select * from contacts`);
        await db.closeAsync();
        return result;
    }

    public async Delete(contact: IContact): Promise<void> {
        const db = await SQLite.openDatabaseAsync('lcllite.db');
        await db.runAsync(`delete * from contacts where username = $username`, {username: contact.username});
        await db.closeAsync();
    }
}