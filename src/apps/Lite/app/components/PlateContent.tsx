import { Image, StyleSheet, Text, View } from 'react-native';
import { IContact } from '../repositories/contactRepository';

export default function PlateComponent(props: IContact) {
    return(
        <View style={styles.plate}>
            <View style={styles.photoContainer}>
                <Image style={styles.photo} source={require('../../assets/logo.png')}></Image>
            </View>
            <View style={styles.content}>
                {/* <Text style={styles.contact}>{props.title}</Text> */}
                <Text style={styles.contact}>{props.username}</Text>
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