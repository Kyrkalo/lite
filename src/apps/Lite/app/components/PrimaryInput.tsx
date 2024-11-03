import React, { forwardRef, useImperativeHandle, useState } from "react";
import { TextInput, StyleSheet, ReturnKeyTypeOptions, Text } from "react-native";
import { InputProps } from "../interfaces/props";

function PrimaryInput(props: InputProps, ref: any) {

    const [inputError, setInputError] = useState<string | null>(null);

    const validate = (): boolean => {
        
        if(props.isRequired) {
            if((props.value || '').length === 0) {
                setInputError((prev) => prev = props.error || "Field is required.");
                return false;
            }
    
            if (props.min && props.value && props.value.length  < props.min) {
                setInputError((prev) => prev = props.error || `Minimum length is ${props.min}`);
                return false;
            }
    
            if (props.max && props.value && props.value.length  > props.max) {
                setInputError((prev) => prev = props.error || `Maximum length is ${props.max}`);
                return false;
            }
        }        
        setInputError(prev => prev = "");
        return true;
      };
    
      useImperativeHandle(ref, () => ({ validate: validate}));

    return (
        <>
            <TextInput
            editable={props.editable}
            onChangeText={props.onChange} 
            style={ styles.input }
            blurOnSubmit ={ props.blurOnSubmit }
            returnKeyType={ props.returnKey }
            placeholder={ props.placeholder }></TextInput>
            { props.isRequired && inputError ? <Text style={styles.error}>{inputError}</Text> : null }
        </>
    );
}

export default forwardRef(PrimaryInput);

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