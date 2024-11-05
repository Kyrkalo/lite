import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import HeaderComponent from '../components/HeaderContent';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomDrawerComponene from '../components/CustomDrawer';
import InviteScreen from '../screens/InviteScree';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { RootDrawerParamList } from '../types/rootDrawerParamList';
import SplashScreen from '../screens/SplashScreen';
import PreLoginScreen from '../screens/PreLoginScreen';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function Navigations() {
    return(
      
        <NavigationContainer>
          <Drawer.Navigator 
          initialRouteName='Splash'
          //drawerContent={(props) => <DrawerContent {...props} /> }
          drawerContent={(props) => <CustomDrawerComponene {...props}/>}
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
            <Drawer.Screen name="Invite" component={InviteScreen} />
            <Drawer.Screen name="Chat" component={ChatScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
            <Drawer.Screen name="Splash" component={SplashScreen} options={{
              headerShown: false,
              drawerLabel: () => null,
              drawerIcon: () => null,
              title: undefined              
            }}/>
            <Drawer.Screen name="PreLogin" component={PreLoginScreen} options={{
              headerShown: false,
              drawerLabel: () => null,
              drawerIcon: () => null,
              title: undefined              
            }}/>
            <Drawer.Screen name="Login" component={LoginScreen} options={{
              headerShown: false,
              drawerLabel: () => null,
              drawerIcon: () => null,
              title: undefined
            }}/>
            <Drawer.Screen name="Register" component={RegisterScreen} options={{
              headerShown: false,
              drawerLabel: () => null,
              drawerIcon: () => null,
              title: undefined              
            }}/>

            {/* <Drawer.Screen name="Login" component={AuthStack} options={{ drawerLabel: () => null, title: '', drawerIcon: () => null, headerShown: false }} /> 
            <Drawer.Screen name="Register" component={AuthStack} options={{ drawerLabel: () => null, title: '', drawerIcon: () => null, headerShown: false }} /> */}

          
          </Drawer.Navigator>
      </NavigationContainer>
    )
}