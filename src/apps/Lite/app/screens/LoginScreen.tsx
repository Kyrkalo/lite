import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
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
    const [enableLogin, setEnableLogin] = useState(false);
    
    useEffect(() => {
        setEnableLogin(details.username?.trim() != '' && details.password?.trim() != '');
    }, [details.username, details.password]);

    const authService = useAuthService();

    const {state, dispatch} = useGlobalContext();

    const onClickLoginButton = async function(e: any): Promise<void> {
        if (enableLogin) {
            setEnableLogin(e => e = false);        
            await authService.login(details, dispatch);
            setEnableLogin(e => e = true);  
        }
    }

    const handleInput = function(key: string, e: any): void {
        setDetails({ ...details, [key]: e });
    }

    return (
    <View style={globalStyles.modalContainer}>
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

