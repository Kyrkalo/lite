import React from "react";
import { ContactService } from "../services/contactService";
import { MessagingService } from "../services/messagingService";
import { AuthService } from "../services/authService";
import { UserSettingsService } from "../services/userSettingsService";

const ContactServiceContext = React.createContext<ContactService | null>(null);
const MessagingServiceContext = React.createContext<MessagingService | null>(null);
const AuthServiceContext = React.createContext<AuthService | null>(null);
const SettingsServiceContext = React.createContext<UserSettingsService | null>(null);

export {
    ContactServiceContext,
    MessagingServiceContext,
    AuthServiceContext,
    SettingsServiceContext
}