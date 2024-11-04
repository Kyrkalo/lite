import React from "react";
import { ContactService } from "../services/contactService";
import { MessagingService } from "../services/messagingService";
import { AuthService } from "../services/authService";
import { UserSettingsService } from "../services/userSettingsService";
import { ProfileService } from "../services/profileService";
import { GlobalContextProps } from "../interfaces/props";
import { initialState } from "../reducers/globalReducer";

const ContactServiceContext = React.createContext<ContactService | null>(null);
const MessagingServiceContext = React.createContext<MessagingService | null>(null);
const AuthServiceContext = React.createContext<AuthService | null>(null);
const SettingsServiceContext = React.createContext<UserSettingsService | null>(null);
const ProfileServiceContext = React.createContext<ProfileService | null>(null);
const GlobalContext = React.createContext<GlobalContextProps>({ state: initialState, dispatch: () => undefined, });

export {
    ContactServiceContext,
    MessagingServiceContext,
    AuthServiceContext,
    SettingsServiceContext,
    ProfileServiceContext,
    GlobalContext
}