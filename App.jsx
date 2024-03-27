import React, { useState } from 'react';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {

  const [token, setToken] = useState('');

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    setToken(token);
    return token;
  }

  return (
  <SafeAreaProvider>
    <Provider store={store}>
      { getToken() ? <AppRoutes token={token} /> : <> </> }
    </Provider>
  </SafeAreaProvider>
  );
}

export default App;
