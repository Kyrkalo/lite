import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileModel } from '../models/profileModel';
import { ProfileService } from '../services/profileService';

export default function ProfileScreen() {

  const [profile, setProfile] = useState<ProfileModel>({ email: '', phone: '', username: '', avatar: ''});
  const profileService = new ProfileService();


    useEffect(() => {
      const fetch = async () => {        
        let response = await profileService.get();
        setProfile(response);
      };
      fetch();
    }, []);

  return (
    <View>
      <Text>This is profile screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}