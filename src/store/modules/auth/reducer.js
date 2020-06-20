import produce from 'immer';
// import { AsyncStorage } from 'react-native';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        draft.loading = true;
        return draft;
      case '@auth/SIGN_OUT_REQUEST':
        draft.token = null;
        draft.signed = false;
        return draft;
      case '@auth/SIGN_IN_SUCCESS':
        // await AsyncStorage.setItem('@MeeK:token', action.payload);
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        return draft;
      case '@auth/SIGN_IN_FAILURE':
        draft.loading = false;
        return draft;
      default:
        return state;
    }
  });
}
