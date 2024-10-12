import { useState } from "react";
import { TouchableOpacity, StyleSheet, Button, View, Text } from "react-native";
import { useAuthService } from "../hooks/useServices";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryPasswordInput from "../components/PrimaryPasswordInput";

export default function LoginScreen() {

    const [details, setDetails] = useState({ username: '', password: '', code: ''});
    const enableLogin = details.username.trim() != '' && details.password.trim() != ''
    const authService = useAuthService();

    const onClickLoginButton = async function(e: any) {
        await authService.login(details.username, details.password);
    }

    const handleUserNameInput = function(e: any): void {
        setDetails({ ...details, username: e });
    }

    const handlePasswordInput = function(e: any) {
        setDetails({ ...details, password: e });
    }

    return (
    <View style={styles.container}>
        <View style={styles.centeredView}>
        <PrimaryInput
            value={details.username}
            placeholder="user name"
            returnKey="next"
            onChange={handleUserNameInput}/>
        <PrimaryPasswordInput
            onChange={handlePasswordInput}
            returnKey="next"
            placeholder="password"
        />        

        <TouchableOpacity
        style={[
            styles.loginButton,
            {
                backgroundColor: enableLogin ? '#c6cbef' : '#A9A9A9'
            }
        ]} 
        disabled={enableLogin}
        onPress={onClickLoginButton}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>        
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    centeredView: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
      },
    loginButton: {
        backgroundColor: '#c6cbef',
        alignItems: 'center',
        borderRadius: 5,
        fontSize: 16,
        height:50,
        width: 250,
        padding: 10,
        margin: 12
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 16,
    }
});