import React from 'react';
import { Button, View, TextInput, StyleSheet } from "react-native";
import { ContactService } from '../services/contactService';

export default function InviteScreen() {
    
    const [username, onChangeText] = React.useState('');

    const submit = async () => {
        if (username) {
            const contactService = new ContactService();
            await contactService.Add({ username: username, photo: ''});
        }
    }

    return (
        <View>
            <TextInput 
            style={styles.input}
            onChangeText={onChangeText}
            value={username}>
            </TextInput>
            <Button
            title="Invite"
            color="#f194ff"
            onPress={submit}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});