import { ReturnKeyTypeOptions, StyleSheet, TextInput } from "react-native";

interface PasswordProps {
    name?: string | undefined;
    value?: string | undefined;
    onChange?: (text: string) => void | undefined;
    placeholder?: string | undefined;
    returnKey?: ReturnKeyTypeOptions | undefined;
    blurOnSubmit?: boolean | undefined;
}

export default function PrimaryPasswordInput(props: PasswordProps) {
    return (
        <TextInput 
            onChangeText={props.onChange}
            style={styles.password} 
            blurOnSubmit={props.blurOnSubmit ?? false}
            secureTextEntry={true}
            returnKeyType={props.returnKey}
            placeholder={props.placeholder}/>
    );
}

const styles = StyleSheet.create({
    password: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
    }
});