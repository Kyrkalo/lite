import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../components/HeaderContent';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DrawerComponent from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function Navigations() {
    return(
      
        <NavigationContainer>
        <Drawer.Navigator 
        initialRouteName='Home'
        drawerContent={(props) => <DrawerComponent {...props}/>}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#c6cbef'
          },
          headerTitle: () => <HeaderComponent/>,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          drawerStyle:{
            backgroundColor: '#c6cbef',
            width: 240
          }
        }}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Chat" component={ChatScreen} />
          <Drawer.Screen name="Settings" 
          component={SettingsScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
}