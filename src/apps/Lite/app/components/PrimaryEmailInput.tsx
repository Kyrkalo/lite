import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  TextInput,
  StyleSheet,
  ReturnKeyTypeOptions,
  Text,
} from "react-native";
import { InputProps } from "../interfaces/props";


function PrimaryEmailInput(props: InputProps, ref: any) {

  const [inputError, setInputError] = useState<string | null>(null);

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(props.value || "");
    
    if (!valid) {
      setInputError((prev) => prev = props.error || "Is required.");
    } else {
      setInputError((prev) => prev = null);
    }
    return valid;
  };

  useImperativeHandle(ref, () => ({ validate: validateEmail}));


  return (
    <>
      <TextInput
        onChangeText={props.onChange}
        style={styles.input}
        blurOnSubmit={props.blurOnSubmit}
        returnKeyType={props.returnKey}
        placeholder={props.placeholder}
      ></TextInput>
      {props.isRequired && inputError ? (
        <Text style={styles.error}>{inputError}</Text>
      ) : null}
    </>
  );
}

export default forwardRef(PrimaryEmailInput);

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
    color: "#fc5e3a",
    fontSize: 13,
  },
});
