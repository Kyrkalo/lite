import React from "react";
import { TextInput, StyleSheet, ReturnKeyTypeOptions, Text } from "react-native";
import { InputProps } from "./PrimaryInput";

export default function PrimaryEmailInput(props: InputProps) {

    return (
        <>
            <TextInput
            onChangeText={props.onChange} 
            style={ styles.input }
            blurOnSubmit ={ props.blurOnSubmit }
            returnKeyType={ props.returnKey }
            placeholder={ props.placeholder }></TextInput>
            { props.isRequired && props.error ? <Text style={styles.error}>{props.error}</Text> : null }
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