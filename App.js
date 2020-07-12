import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Root} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MenuProvider} from 'react-native-popup-menu';

import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Root>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {user ? (
              <>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Matches" component={MatchesScreen} />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </Root>
  );
}

export default App;
