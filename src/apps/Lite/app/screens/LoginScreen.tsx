import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useAuthService } from "../hooks/useServices";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryPasswordInput from "../components/PrimaryPasswordInput";
import { globalStyles } from "../styles";


export default function LoginScreen() {

    const [details, setDetails] = useState({ username: '', password: '', code: ''});
    const enableLogin = details.username.trim() != '' && details.password.trim() != ''
    const authService = useAuthService();

    const onClickLoginButton = async function(e: any) {
        if (enableLogin) {
            await authService.login(details.username, details.password);
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
            disabled={enableLogin}
            onPress={onClickLoginButton}>
                <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>        
    </View>
    );
}

