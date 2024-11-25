import React from "react";
import { ILabel } from "../interfaces/props";
import { Text, StyleSheet, View } from "react-native";


export default function Label(props: ILabel) {
    return (
        <View style={styles.view}>
            { props.title ? <Text style={styles.title}>{props.title}</Text> : null }
            { props.text ? <Text style={styles.text}>{props.text}</Text> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 10        
    },
    title: {
        fontSize: 15,
        paddingRight: 10,
        fontWeight: '500',
        width: 100
    },    
    text: {
        fontSize: 15,
        fontWeight: '400'
    }
});