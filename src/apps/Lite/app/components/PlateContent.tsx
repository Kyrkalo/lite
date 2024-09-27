import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Contact, ContactService } from '../services/ContactService';
import { useEffect, useState } from 'react';

export default function PlateComponent(props: Contact) {
    return(
        <View style={styles.plate}>
            <View style={styles.photoContainer}>
                <Image style={styles.photo} source={require('../../assets/logo.png')}></Image>
            </View>
            <View style={styles.content}>
                <Text style={styles.contact}>{props.title}</Text>
                <Text style={styles.contact}>{props.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    plate: {
        margin: 10,
        height: 60,        
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomColor: '#c6cbef',
        borderBottomWidth: 2
    },
    photoContainer: {
        height: 50
    },
    content: {
        marginLeft: 10,
    },
    contact: {

    },
    title: {
    },
    photo: {
        width: 50,
        height: 50
    }
});