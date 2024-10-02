import { AxiosInstance } from "axios";
import HttpInterceptor from "../interceptors/httpInterceptor";
import { ContactRepository, IContact } from "../repositories/contactRepository";

export class ContactService extends HttpInterceptor {

    private contactRepository: ContactRepository;

    constructor() {
        super('');
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
