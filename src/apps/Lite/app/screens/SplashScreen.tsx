import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState, } from "react";
import { RootDrawerParamList } from "../types/rootDrawerParamList";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export default function SplashScreen() {

    const navigation = useNavigation<NavigationProp<RootDrawerParamList>>();

    useEffect(() => {
        navigation.navigate('PreLogin');
        // const timeout = setTimeout(async () => {
        //     navigation.navigate('PreLogin');
        // }, 2000);
        // return ()=> clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#c6cbef', 
    }, 
    title: { 
        fontSize: 24, 
        marginBottom: 20, 
    }, 
});