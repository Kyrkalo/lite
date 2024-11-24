import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProfileModel } from "../models/profileModel";
import { ProfileService } from "../services/profileService";

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
    <View>
      <Text>Info</Text>
      <Text>Username</Text>
      <Text>{profile.userName}</Text>
      <Text>Email</Text>
      <Text>{profile.email}</Text>
      <Text>Phone</Text>
      <Text>{profile.phone}</Text>
    </View>
  );
}
