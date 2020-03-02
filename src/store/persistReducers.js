import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'meek',
      storage: AsyncStorage,
      whitelist: ['auth', 'user', 'match'],
    },
    reducers
  );

  return persistedReducer;
};
