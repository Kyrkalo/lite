import { ReturnKeyTypeOptions } from "react-native";

export interface InputProps {
    name?: string | undefined;
    value?: string | undefined;
    onChange?: (text: string) => void | undefined;
    placeholder?: string | undefined;
    returnKey?: ReturnKeyTypeOptions | undefined; 
    blurOnSubmit?: boolean | undefined;
    error?: string | undefined;
    isRequired?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    editable?: boolean | undefined;
}

export interface PasswordProps {
    name?: string | undefined;
    value?: string | undefined;
    onChange?: (text: string) => void | undefined;
    placeholder?: string | undefined;
    confirmPlaceholder?: string | undefined;
    returnKey?: ReturnKeyTypeOptions | undefined;
    blurOnSubmit?: boolean | undefined;
    error?: string | undefined;
    isRequired?: boolean | undefined;
    min?: number | undefined;
    confirm?: boolean | undefined;
}