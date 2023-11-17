import React from 'react';

import AppRoutes from './AppRoutes';
import { PaperProvider } from 'react-native-paper';

function App() {

  return (
    <PaperProvider>
      <AppRoutes />
    </PaperProvider>
  );
}

export default App;
