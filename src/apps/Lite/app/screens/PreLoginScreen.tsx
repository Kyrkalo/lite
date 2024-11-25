import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles";
import PrimaryButton from "../components/PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "../types/rootDrawerParamList";

export default function PreLoginScreen() {

    const navigation = useNavigation<NavigationProp<RootDrawerParamList>>();

    const handleLoginButton = function () {
        navigation.navigate('Login');
    }

    const handleRegisterButton = function () {
        navigation.navigate('Register');        
    }

    return (
        <View style={globalStyles.modalContainer}>
            <View style={globalStyles.centeredView}>
                <Text>Welcome</Text>
                <PrimaryButton 
                text="Login"
                onPress={handleLoginButton}
                buttonStyle={globalStyles.nextButton} 
                textStyle={globalStyles.buttonText}/>       
                <PrimaryButton 
                text="Register"
                onPress={handleRegisterButton}
                buttonStyle={globalStyles.nextButton} 
                textStyle={globalStyles.buttonText}/>
            </View>        
        </View>
    );
}