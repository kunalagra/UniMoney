import React from 'react';

import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {

  return (
  <SafeAreaProvider>
    <Provider store={store}>
        <AppRoutes />
    </Provider>
  </SafeAreaProvider>
  );
}

export default App;
