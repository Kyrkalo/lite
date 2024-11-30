import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen () {
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <View>
            <Text>Settings screen</Text>
            <Switch
                trackColor={{false: '#767577', true: '#c6cbef'}}
                onValueChange={toggleSwitch}
                value={isEnabled}
                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
            />
        </View>
    );
}
