/* eslint-disable max-len */
import React from 'react';
import Navigator from './navigators/Navigator';
import {AuthProvider} from './contexts/AuthContext';


const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;
