import { ContactRepository, IContact } from "../repositories/contactRepository";

export class ContactService {

    private contactRepository: ContactRepository;

    constructor() {
        this.contactRepository = new ContactRepository();
    }

    public async getAll(): Promise<IContact[]> {
        let contacts = await this.contactRepository.Fetch();
        return contacts;
    }

    public async Add(contact: IContact): Promise<void> {
        await this.contactRepository.Save(contact);
    }

    public async Delete(contact: IContact): Promise<void> {
        await this.contactRepository.Delete(contact);
    }
}
