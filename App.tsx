import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/home';
import ContactDetail from './src/pages/contact-details';
import {RootStackParamList} from './src/types';
import ContactUpdate from './src/pages/contact-update';
import SplashScreen from './src/pages/splash-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ContactDetails" component={ContactDetail} />
          <Stack.Screen name="ContactUpdate" component={ContactUpdate} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
