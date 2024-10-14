import React from "react";
import { InputProps } from "./PrimaryInput";
import { TextInput, StyleSheet } from "react-native";

export default function PrimaryPhoneInput(props: InputProps) {
  return (
    <TextInput
        style={styles.input}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        keyboardType="phone-pad"
        maxLength={15} 
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,        
    padding: 10,
  },
});
