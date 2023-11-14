/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer, useIsFocused} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import GetStarted from './components/getstarted/GetStarted';
import Login from './components/login/Login';
import ProfileCreation from './components/profilecreation/ProfileCreation';

const Stack = createNativeStackNavigator();


function App() {

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"#fff"}
      />
      <Stack.Navigator>
        <Stack.Screen name="GetStarted" component={GetStarted} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="ProfileCreation" component={ProfileCreation} 
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  main: {
    backgroundColor: "#f3f4f8",
  },
  
  text: {
    color: "#282828"
  },


  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
