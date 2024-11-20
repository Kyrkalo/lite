import React, { useEffect, useState } from "react";
import { useAuthService, useGlobalContext } from "../hooks/useServices";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatedDrawer from "./AuthenticatedDrawer";
import UnauthenticatedStack from "./UnauthenticatedStack";
import { reducer, initialState } from "../reducers/globalReducer";

export default function Navigations()  {
    const authService = useAuthService();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {state, dispatch} = useGlobalContext();

    useEffect(() => {
        const checkAuthentication = async () => {
            const authenticated = await authService.isAuthenticated();
            setIsAuthenticated(authenticated);
            console.log(authenticated);
          };
          checkAuthentication();
          console.log(state.token);
    }, [state?.token]);

    return( 
        <NavigationContainer>
            { isAuthenticated ?
                (<AuthenticatedDrawer/>) :
                (<UnauthenticatedStack/>) }
        </NavigationContainer>
    );
}