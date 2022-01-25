/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  match: null,
  users: [],
  loading: false,
};

export default function match(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@match/CREATE_MATCH_REQUEST':
        draft.match = null;
        draft.loading = true;
        return draft;
      case '@match/ENTER_MATCH_REQUEST':
        draft.loading = true;
        return draft;
      case '@match/START_MATCH_REQUEST':
        draft.loading = true;
        return draft;
      case '@match/CREATE_MATCH_SUCCESS':
        draft.match = action.payload.match;
        draft.loading = false;
        return draft;
      case '@match/ENTER_MATCH_SUCCESS':
        draft.match = action.payload.match;
        draft.loading = false;
        return draft;
      case '@match/START_MATCH_SUCCESS':
        draft.loading = false;
        return draft;
      case '@match/CREATE_MATCH_FAILURE':
        draft.loading = false;
        return draft;
      case '@match/START_MATCH_FAILURE':
        draft.loading = false;
        return draft;
      default:
        return draft;
    }
  });
}
