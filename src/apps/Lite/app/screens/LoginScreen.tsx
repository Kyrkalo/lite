import { useState } from "react";
import { TouchableOpacity, StyleSheet, Button, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useAuthService } from "../hooks/useServices";

export default function LoginScreen() {

    const [details, setDetails] = useState({ username: '', password: '', code: ''});
    const [enableLogin, setEnableLogin] = useState(false);
    const authService = useAuthService();

    const onClickLoginButton = function(e: any) {
        console.log(details);
        authService.login(details.username, details.password)
        .then(l=> {console.log(l)}).catch(l => {
            console.log(l.stack)
        });
    }

    const handleUserNameInput = function(e: any) {
        setDetails({
            ...details,
            username: e
        })
    }

    const handlePasswordInput = function(e: any) {
        setDetails({
            ...details,
            password: e
        })
    }

    return (
    <View style={styles.container}>
        <View style={styles.centeredView}>
        <TextInput 
            onChangeText={handleUserNameInput}
            style={styles.input} 
            returnKeyType="next"
            placeholder="user name"/>
        <TextInput 
            onChangeText={handlePasswordInput}
            style={styles.password} 
            blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType="next"
            placeholder="password"/>
        

        <TouchableOpacity style={styles.loginButton}  onPress={onClickLoginButton}>
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
    },
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,        
        padding: 10,
    },
    password: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
    }
});