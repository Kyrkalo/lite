
export interface Contact {
    id: string;
    title: string;
    name: string;
}


export class ContactService {
    
    public getContacts() : Contact[] {
        let contacts: Contact[] = [
            {
                id: '1',
                name: '@jack.reddoor',
                title:'Jack Reddoor'
            },
            {
                id: '2',
                name: '@brandon.sparrow',
                title:'Brandon Sparrow'
            },
            {
                id: '3',
                name: '@jessica.starsky',
                title:'Jessica Starsky'
            },
            {
                id: '4',
                name: '@keanu.reeves',
                title:'Keanu Reeves'
            }
        ];
        return contacts;
    }
}
