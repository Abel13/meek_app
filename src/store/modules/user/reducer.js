import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@user/SIGN_UP_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.profile = {
          ...action.payload.user,
        };
      });
    case '@user/SIGN_UP_SUCCESS':
      return produce(state, draft => {
        draft.profile = {
          ...action.payload.user,
        };
        draft.loading = false;
      });
    case '@user/SIGN_UP_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
