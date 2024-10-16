import React, { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, TextInput, Text } from "react-native";
import { PasswordProps } from "../interfaces/props";

 function PrimaryPasswordInput(props: PasswordProps, ref: any) {
    
    const [inputError, setInputError] = useState<string | null>(null);
    
    const validate = (): boolean => {

        if (props.isRequired) {
            const { value } = props;
            if (props.min && props.min > (value?.length || 0)) {
                setInputError(prev => prev = props.error ?? `Minimum length is ${props.min}`);
                return false;
            }
            if (!/[^\w\s]/.test(value || '')) {
                setInputError(prev => prev = props.error ?? `Passwords must have at least one non-alphanumeric character.`);
                return false;
            }
            if (!/\d/.test(value || '')) {
                setInputError(prev => prev = props.error ?? `Passwords must have at least one digit (0-9).`);
                return false;
            }
            if (!/[A-Z]/.test(value || '')) {
                setInputError(prev => prev = props.error ?? `Passwords must have at least one uppercase letter (A-Z).`);
                return false;
            }
        }
        setInputError(prev => prev = '');
        return true;
    };

    useImperativeHandle(ref, () => ({ validate: validate}));

    return (
        <>
        <TextInput
            onChangeText={props.onChange}
            style={styles.password}
            blurOnSubmit={props.blurOnSubmit ?? false}
            secureTextEntry={true}
            returnKeyType={props.returnKey}
            placeholder={props.placeholder}
        />
        {props.isRequired && inputError ? <Text style={styles.error}>{inputError}</Text> : null}
        </>
    );
}

export default forwardRef(PrimaryPasswordInput);

const styles = StyleSheet.create({
  password: {
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
