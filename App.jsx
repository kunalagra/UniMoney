import React from 'react';

import AppRoutes from './AppRoutes';
import { Provider as PaperProvider, configureFonts, DefaultTheme } from 'react-native-paper';
import { FONT } from './constants';

const fontConfig = {
  default: {
    regular: {
      fontFamily: FONT.regular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: FONT.medium,
      fontWeight: 'medium',
    },
    bold: {
      fontFamily: FONT.bold,
      fontWeight: 'bold',
    }
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};

function App() {

  return (
    <PaperProvider theme={theme}>
      <AppRoutes />
    </PaperProvider>
  );
}

export default App;
