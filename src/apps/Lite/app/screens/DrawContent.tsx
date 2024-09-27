import { DrawerContentScrollView } from "@react-navigation/drawer";
import { JSX, RefAttributes } from "react";
import { ScrollView, ScrollViewProps, View, StyleSheet, Text } from "react-native";

export default function DrawerContent(
  props: JSX.IntrinsicAttributes &
    ScrollViewProps & { children: React.ReactNode } & RefAttributes<ScrollView>
) {
  return(<DrawerContentScrollView {...props}>
    <View style={styles.drawContentStyle}>
      <Text style={styles.userName}>Roman Kyrkalo</Text>
    </View>
  </DrawerContentScrollView>)
}

const styles = StyleSheet.create({
  drawContentStyle: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
