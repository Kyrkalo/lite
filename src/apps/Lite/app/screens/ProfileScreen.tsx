import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProfileModel } from "../models/profileModel";
import { ProfileService } from "../services/profileService";
import Label from "../components/Label";

export default function ProfileScreen() {

  const [profile, setProfile] = useState<ProfileModel>({
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
        <Text>Todo: Photo goes here</Text> 
        <Label key="info" title="Info"></Label>
        <Label key="username" title="Username" text={profile.userName}></Label>
        <Label key="email" title="Email" text={profile.email}></Label>
        <Label key="phone" title="Phone" text={profile.phone}></Label> 
        <Text>Todo: QR code goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', 
    alignItems: 'baseline', 
    paddingLeft: 10,
    paddingTop: 20
  }
});
