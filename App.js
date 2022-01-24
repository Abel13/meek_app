import React from 'react';
import { Provider } from 'react-redux';

import { StatusBar } from 'react-native';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

import AppRoutes from './src/AppRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar hidden />
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}
