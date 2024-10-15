import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, ReturnKeyTypeOptions, Text } from "react-native";

export interface InputProps {
    name?: string | undefined;
    value?: string | undefined;
    onChange?: (text: string) => void | undefined;
    placeholder?: string | undefined;
    returnKey?: ReturnKeyTypeOptions | undefined;
    blurOnSubmit?: boolean | undefined;
    error?: string | undefined;
    isRequired?: boolean | undefined;
}

export default function PrimaryInput(props: InputProps) {

    const [error, setError] = useState(false);
    useEffect(() => {
        if (props.error) {
            setError(true);
        } else {            
            setError(false);
        }
    }, [props.error])

    return (
        <>
            <TextInput
            onChangeText={props.onChange} 
            style={ styles.input }
            blurOnSubmit ={ props.blurOnSubmit }
            returnKeyType={ props.returnKey }
            placeholder={ props.placeholder }></TextInput>
            { props.isRequired && error ? <Text style={styles.error}>{props.error}</Text> : null }
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,        
        padding: 10,
    },
    error: {
        marginLeft: 22,
        marginBottom: 12,
        color: '#fc5e3a',
        fontSize: 13
    }
});