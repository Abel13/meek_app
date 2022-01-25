import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/SIGN_UP_REQUEST':
        draft.loading = true;
        return draft;
      case '@auth/SIGN_IN_SUCCESS':
        draft.profile = {
          ...action.payload.user,
        };
        return draft;
      case '@user/SIGN_UP_SUCCESS':
        draft.profile = {
          ...action.payload.user,
        };
        draft.loading = false;
        return draft;
      case '@user/SIGN_UP_FAILURE':
        draft.loading = false;
        return draft;
      default:
        return state;
    }
  });
}
