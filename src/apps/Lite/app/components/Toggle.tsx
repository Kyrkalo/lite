import React, { useState } from "react";
import { Text, StyleSheet, View, Switch } from "react-native";
import { IToogle } from "../interfaces/props";

export default function Toggle(props: IToogle) {

    //const [isEnabled, setIsEnabled] = useState(false);
    
    return (
        <View>
            { props.title ? <Text style={styles.title}>{props.title}</Text> : null }
            <Switch
                trackColor={{false: '#767577', true: '#c6cbef'}}
                onValueChange={props.onChange}
                value={props.value}
                // thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            />
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