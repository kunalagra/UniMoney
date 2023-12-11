import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'react-native';

import { GetStarted, Login, SignUp, GenderPage, AgePage, GoalsPage, GoalsProgressPage, SpendingCategoriesPage, SpendingLimitsPage, MessageSyncPage, TransactionSyncPage, PushNotificationPage, SettingUpPage, MainPage } from './components'
import { COLORS } from './constants';
import TransactionDetailsPage from './components/transaction-details/TransactionDetails';
import AddTransactionPage from './components/add-transaction/AddTransaction';

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
        <Stack.Screen name="Main" component={MainPage} 
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
        <Stack.Screen name="MessageSyncPage" component={MessageSyncPage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="TransactionSyncPage" component={TransactionSyncPage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="PushNotificationPage" component={PushNotificationPage} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SettingUpPage" component={SettingUpPage} 
          options={{
            headerShown: false,
          }}
        /> 
        <Stack.Screen name="TransactionDetailsPage" component={TransactionDetailsPage} 
          options={{
            headerShown: false,
          }}
        /> 
        <Stack.Screen name="AddTransactionPage" component={AddTransactionPage} 
          options={{
            headerShown: false,
          }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
