import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Label from "../components/Label";
import IUser from "../models/IUser";
import { useGlobalContext } from "../hooks/useServices";

export default function ProfileScreen() {
  const { state, dispatch } = useGlobalContext();
  const [profile, setProfile] = useState<IUser>({
    email: state.user?.email,
    phone: "",
    userName: "",
    avatar: "",
  });

  useEffect(() => {
    if (state.user) {
      setProfile({ ...state.user });
    }
  }, [state.user]);

  const handleInput = function (key: string, e: any): void {
    setProfile({ ...profile, [key]: e });
  };

  return (
    <View style={styles.container}>
      <Label key="info" title="Info"></Label>
      <Label key="username" title="Username" text={profile.userName}></Label>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={
            profile.avatar
              ? { uri: profile.avatar } // Dynamic source
              : require('../../assets/nophoto.png') // Default image
          }
        />
      </View>
      <Label key="email" title="Email" text={profile.email}></Label>
      <Label key="phone" title="Phone" text={profile.phone}></Label>
      <Text>Todo: QR code goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    alignSelf: "center",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "baseline",
    paddingLeft: 10,
    paddingTop: 20,
  },
});
