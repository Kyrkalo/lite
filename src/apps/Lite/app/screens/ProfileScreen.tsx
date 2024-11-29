import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IUser } from "../models/IUser";
import { ProfileService } from "../services/profileService";
import Label from "../components/Label";

export default function ProfileScreen() {

  const [profile, setProfile] = useState<IUser>({
    email: "",
    phone: "",
    userName: "",
    avatar: "",
  });

  const profileService = new ProfileService();

  useEffect(() => {
    const fetch = async () => {
      let response = await profileService.get();
      setProfile(response);
    };
    fetch();
  }, []);

  const handleInput = function(key: string, e: any): void {
    setProfile({ ...profile, [key]: e });
  }

  return (
    <View style={styles.container}>
        <Label key="info" title="Info"></Label>
        <Label key="username" title="Username" text={profile.userName}></Label>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar}
            source={require('../../assets/nophoto.png')}
          />
        </View>
        <Label key="email" title="Email" text={profile.email}></Label>
        <Label key="phone" title="Phone" text={profile.phone}></Label> 
        <Text>Todo: QR code goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer:{
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 20,
    alignSelf: 'center',
    verticalAlign: 'middle'
  },
  avatar: {
    height:80,
    width:80,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    justifyContent: 'flex-start', 
    alignItems: 'baseline', 
    paddingLeft: 10,
    paddingTop: 20
  }
});
