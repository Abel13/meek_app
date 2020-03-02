import React from 'react';
import { useSelector } from 'react-redux';

import { setNavigator } from './services/NavigationService';

import createRouter from './routes';

export default function AppRoutes() {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return (
    <Routes
      ref={nav => {
        setNavigator(nav);
      }}
    />
  );
}
