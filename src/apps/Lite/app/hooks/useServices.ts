import { useContext } from "react";
import { AuthServiceContext, ContactServiceContext, MessagingServiceContext, SettingsServiceContext } from "../contexts/serviceContexts";
import { AuthService } from "../services/authService";
import { ContactService } from "../services/contactService";
import { MessagingService } from "../services/messagingService";
import { UserSettingsService } from "../services/userSettingsService";

class UseServices {
    public get<C, T>(context: React.Context<T | null>): T {
        const service = useContext(context);
        if(!service) {
            throw new Error(`UseService is not set up correctly for ${context.displayName || 'the context'}.`)
        }
        return service;
    }
}

const useService = new UseServices();
export const useAuthService = (): AuthService => useService.get(AuthServiceContext);
export const useContactService = (): ContactService => useService.get(ContactServiceContext);
export const useMessagingService =(): MessagingService => useService.get(MessagingServiceContext);
export const useSettingsService =(): UserSettingsService => useService.get(SettingsServiceContext);