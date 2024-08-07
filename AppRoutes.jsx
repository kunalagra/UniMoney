import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'react-native';

import { GetStarted, Login, SignUp, GenderPage, AgePage, GoalsPage, GoalsProgressPage, SpendingCategoriesPage, SpendingLimitsPage, MessageSyncPage, TransactionSyncPage, PushNotificationPage, SettingUpPage, MainPage, DublicateGetStarted } from './components'
import { COLORS } from './constants';
import TransactionDetailsPage from './components/transaction/transaction-details/TransactionDetails';
import AddTransactionPage from './components/transaction/add-transaction/AddTransaction';
import AddCategory from './components/add-category/AddCategory';
import AddBill from './components/bills/add-bill/AddBill';
import SettingsPage from './components/settings/SettingsPage';
import BillsPage from './components/bills/BillsPage';
import CustomImport from './components/settings/custom-import/CustomImport';
import GamePage from './components/gamification/GamePage';
import Banks from './components/banks/banks';
import TransactionByBank from './components/banks/getTransactionsBy-bank/TransactionByBank';
import TransactionByCat from './components/main/budget/transactionByCat/transactionByCat';
import TransactionByInsights from './components/main/insights/transactionbyinsights/transactionByInsights';
import Profile from './components/settings/profile/Profile';
import UpdateBill from './components/bills/update-bill/UpdateBill';
import FAQs from './components/settings/faqs/FAQs';

const Stack = createNativeStackNavigator();


function AppRoutes({ token }) {

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.white1}
      />
      
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}
      >
        {!token && <Stack.Screen name="GetStarted" component={GetStarted}
          options={{
            headerShown: false,
          }}
          />}
          <Stack.Screen name="Main" component={MainPage}
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
        <Stack.Screen name="AddCategoryPage" component={AddCategory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AddBillPage" component={AddBill}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SettingsPage" component={SettingsPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="BillsPage" component={BillsPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="CustomImportPage" component={CustomImport}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="DublicateGetStarted" component={DublicateGetStarted}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="GamePage" component={GamePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Banks" component={Banks}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="TransactionByBank" component={TransactionByBank}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="TransactionByCat" component={TransactionByCat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="TransactionByInsights" component={TransactionByInsights}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="ProfilePage" component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="UpdateBill" component={UpdateBill}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="FAQs" component={FAQs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
