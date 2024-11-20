import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigations from "./app/navigation/Navigations";
import {
  AuthServiceContext,
  ContactServiceContext,
  GlobalContext,
} from "./app/contexts/serviceContexts";
import { AuthService } from "./app/services/authService";
import { ContactService } from "./app/services/contactService";
import { useReducer } from "react";
import { reducer, initialState } from "./app/reducers/globalReducer";

const authService = new AuthService();
const contactService = new ContactService();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <AuthServiceContext.Provider value={authService}>
        <ContactServiceContext.Provider value={contactService}>
          <SafeAreaProvider>
            <Navigations></Navigations>
          </SafeAreaProvider>
        </ContactServiceContext.Provider>
      </AuthServiceContext.Provider>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
