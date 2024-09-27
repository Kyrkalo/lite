import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import DrawerTopComponent from "./DrawerTop";

const Drawer = createDrawerNavigator();

export default function DrawerComponent({
    descriptors,
    state,
    ...props
  }: DrawerContentComponentProps) {


    return (
        <View style={styles.drawer}>
            <DrawerTopComponent></DrawerTopComponent>
            <View style={styles.screens}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList state={state} descriptors={descriptors} {...props} />
                </DrawerContentScrollView>
            </View>
            <View style={styles.footer}>
                <Text>
                    Logout goes here
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawer:{
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    screens: {
        height: 400,
    },
    footer: {
        marginBottom: 10,
    }
});

