import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Contact, ContactService } from '../services/contactService';
import { useEffect, useState } from 'react';
import PlateComponent from '../components/PlateContent';


export default function ChatScreen() {

    const contactService = new ContactService();

    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const loadContacts = () => {
            var response:Contact[] = [];
            try{
                response = contactService.getContacts();
            }
            catch(error)
            {

            }
            finally
            {
                setContacts(response);
            }
            
        };
        loadContacts();
    }, []);

    return(
        <View style={styles.container}>
        <FlatList
        style={styles.list}
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <PlateComponent 
                id={item.id} 
                name={item.name} 
                title={item.title}>
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