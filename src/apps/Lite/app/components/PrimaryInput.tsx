import React from "react";
import { TextInput, StyleSheet, ReturnKeyTypeOptions } from "react-native";

interface InputProps {
    name?: string | undefined;
    value?: string | undefined;
    onChange?: (text: string) => void | undefined;
    placeholder?: string | undefined;
    returnKey?: ReturnKeyTypeOptions | undefined;
    blurOnSubmit?: boolean | undefined;
}

export default function PrimaryInput(props: InputProps) {
    return (
        <TextInput
            onChangeText={props.onChange} 
            style={ styles.input }
            blurOnSubmit ={ props.blurOnSubmit }
            returnKeyType={ props.returnKey }
            placeholder={ props.placeholder }></TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,        
        padding: 10,
    }
});