import { createDrawerNavigator } from "@react-navigation/drawer";
import HeaderComponent from "../components/HeaderContent";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawerComponene from "../components/CustomDrawer";
import InviteScreen from "../screens/InviteScree";
import { RootDrawerParamList } from "../types/rootDrawerParamList";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function AuthenticatedDrawer() {
  return (
      <Drawer.Navigator
        initialRouteName="Home"
        //drawerContent={(props) => <DrawerContent {...props} /> }
        drawerContent={(props) => <CustomDrawerComponene {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#c6cbef",
          },
          headerTitle: () => <HeaderComponent />,
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          drawerStyle: {
            backgroundColor: "#c6cbef",
            width: 240,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Invite" component={InviteScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  );
}
