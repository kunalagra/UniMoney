import React from 'react';

import AppRoutes from './AppRoutes';
import { ProfileCreationProvider } from './contexts/profilecreation/profileCreationContext';

function App() {

  return (
    <ProfileCreationProvider>
      <AppRoutes />
    </ProfileCreationProvider>
  );
}

export default App;
