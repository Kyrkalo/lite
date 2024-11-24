import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import DrawerTopComponent from "./DrawerTop";
import { useAuthService, useGlobalContext } from "../hooks/useServices";
import PrimaryButton from "./PrimaryButton";

const Drawer = createDrawerNavigator();

export default function CustomDrawerComponene({
    descriptors,
    state,
    ...props
  }: DrawerContentComponentProps) {

    const auth = useAuthService();
    const { dispatch } = useGlobalContext();

    const handleLogout = () => {
        auth.logout(dispatch);
    };

    return (
        <View style={styles.drawer}>
            <DrawerTopComponent></DrawerTopComponent>
            <View style={styles.screens}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList state={state} descriptors={descriptors} {...props} />
                </DrawerContentScrollView>
            </View>
            <View style={styles.footer}>
                <PrimaryButton
                text="Logout"
                onPress={handleLogout}/>
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
        height: 500,
    },
    footer: {
        marginBottom: 50,
        marginLeft: 27

    }
});
