import React, { useEffect, useState } from "react";
import { InputProps } from "./PrimaryInput";
import { TextInput, StyleSheet, Text } from "react-native";

export default function PrimaryPhoneInput(props: InputProps) {
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        keyboardType="phone-pad"
        maxLength={15} 
      />
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
