import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { ProfileService } from "../services/profileService";

export default function DrawerTopComponent() {

    const [profile, setProfile] = useState<any>({} as any);
    const profileService = new ProfileService();

    useEffect(() => {
        let response = profileService.get();
        setProfile(response);
    }, []);

    return(
        <View style={styles.top}>
            <Image 
                style={styles.avatar} 
                source={require('../../assets/logo.png')}>
            </Image>
            <Text style={styles.userName}> 
                {profile.username}
            </Text>
            <Text style={styles.phone}> 
                {profile.phone}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 60,
    },
    top: {
        marginTop:50,
        marginLeft: 10,
        height: 'auto',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    userName: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    phone: {
        marginBottom: 20
    }
});