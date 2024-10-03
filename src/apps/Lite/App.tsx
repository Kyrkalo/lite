import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigations from './app/navigation/Navigations';
import { AuthServiceContext, ContactServiceContext } from './app/contexts/serviceContexts';
import { AuthService } from './app/services/authService';
import { ContactService } from './app/services/contactService';

const authService = new AuthService();
const contactService = new ContactService();

export default function App() {
  return (
    <AuthServiceContext.Provider value={authService}>
      <ContactServiceContext.Provider value={contactService}>
        <SafeAreaProvider>
          <Navigations></Navigations>      
        </SafeAreaProvider>
      </ContactServiceContext.Provider>
    </AuthServiceContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
