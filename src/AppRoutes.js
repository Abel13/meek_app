import React from 'react';
import { useSelector } from 'react-redux';

import { setNavigator } from './services/NavigationService';

import createRouter from './routes';
import api from './services/api';

export default function AppRoutes() {
  const { signed, token } = useSelector(state => state.auth);

  api.defaults.headers.common.Authorization = `Bearer ${token}`;

  const Routes = createRouter(signed);

  return (
    <Routes
      ref={nav => {
        setNavigator(nav);
      }}
    />
  );
}
