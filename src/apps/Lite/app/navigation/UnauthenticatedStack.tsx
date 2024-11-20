import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";
import PreLoginScreen from "../screens/PreLoginScreen";

export default function UnauthenticatedStack() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="PreLoginScreen">
          <Stack.Screen
            name="PreLoginScreen"
            component={PreLoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
}