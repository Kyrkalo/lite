import React, { forwardRef, useImperativeHandle, useState } from "react";

import { TextInput, StyleSheet, Text } from "react-native";
import { InputProps } from "../interfaces/props";

function PrimaryPhoneInput(props: InputProps, ref: any) {

  const [inputError, setInputError] = useState<string | null>(null);
  
  const validate = (): boolean => {    
    if (props.isRequired &&  (props.value?.length ?? 0) < 10) {
      setInputError((prev) => prev = (props.error || 'Phone number is required'));
      return false;
    }
    setInputError((prev) => prev = '');
    return true;
  };

  useImperativeHandle(ref, () => ({ validate: validate}));

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        keyboardType="phone-pad"
        maxLength={15} 
      />
      { props.isRequired && inputError ? <Text style={styles.error}>{inputError}</Text> : null }
    </>
  );
}

export default forwardRef(PrimaryPhoneInput);

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
