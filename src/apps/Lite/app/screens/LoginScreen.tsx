import { useContext, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useAuthService, useGlobalContext } from "../hooks/useServices";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryPasswordInput from "../components/PrimaryPasswordInput";
import { globalStyles } from "../styles";
import LoginModel from "../models/loginModel";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "../types/rootDrawerParamList";


export default function LoginScreen() {

    const navigation = useNavigation<NavigationProp<RootDrawerParamList, 'Login'>>();

    const [details, setDetails] = useState<LoginModel>({ username: '', password: ''});

    const enableLogin = details.username?.trim() != '' && details.password?.trim() != '';

    const authService = useAuthService();

    const {state, dispatch} = useGlobalContext();

    const onClickLoginButton = async function(e: any): Promise<void> {
        if (enableLogin) {
            await authService.login(details, dispatch);
        }
    }

    const handleInput = function(key: string, e: any): void {
        setDetails({ ...details, [key]: e });
    }

    return (
    <View style={globalStyles.container}>
        <View style={globalStyles.centeredView}>
        <PrimaryInput
            value={details.username}
            placeholder="user name"
            returnKey="next"
            onChange={value => handleInput('username', value)}/>
        <PrimaryPasswordInput
            onChange={value => handleInput('password', value)}
            returnKey="next"
            placeholder="password"/>
        <TouchableOpacity
            style={[
                globalStyles.loginButton,
                {
                    backgroundColor: enableLogin ? '#c6cbef' : '#A9A9A9'
                }
            ]} 
            disabled={!enableLogin}
            onPress={onClickLoginButton}>
                <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>        
    </View>
    );
}

