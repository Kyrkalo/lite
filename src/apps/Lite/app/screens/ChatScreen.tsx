import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import PlateComponent from '../components/PlateContent';
import { IContact } from '../repositories/contactRepository';
import { useContactService } from '../hooks/useServices';


export default function ChatScreen() {

    const contactService = useContactService();
    const [contacts, setContacts] = useState<IContact[]>([]);

    useEffect(() => {
    }, []);

    return(
        <View style={styles.container}>
        <FlatList
        style={styles.list}
            data={contacts}
            keyExtractor={(item) => item.username}
            renderItem={({ item }) => (
            <PlateComponent 
                id={item.id}
                photo={item.photo}
                username={item.username}>
            </PlateComponent>
            
            )}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
    },
    list: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    plate: {
        margin: 20
    },
    contact: {

    },
    title: {
    },
    photo: {
    }
});