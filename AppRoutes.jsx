import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'react-native';

import { GetStarted, Login, SignUp, GenderPage, AgePage, GoalsPage, GoalsProgressPage, SpendingCategoriesPage, SpendingLimitsPage } from './components'
import { COLORS } from './constants';

const Stack = createNativeStackNavigator();


function AppRoutes () {

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.white1}
      />
      <Stack.Navigator
       screenOptions={{
        animation : 'slide_from_right',
       }}
      >
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
        <Stack.Screen name="SignUp" component={SignUp} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="GenderPage" component={GenderPage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AgePage" component={AgePage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="GoalsPage" component={GoalsPage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="GoalsProgressPage" component={GoalsProgressPage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SpendingCategoriesPage" component={SpendingCategoriesPage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SpendingLimitsPage" component={SpendingLimitsPage} 
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
