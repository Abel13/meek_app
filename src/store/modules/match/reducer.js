/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  match: null,
  users: [],
  loading: false,
};

export default function match(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@match/CREATE_MATCH_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@match/ENTER_MATCH_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@match/START_MATCH_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@match/CREATE_MATCH_SUCCESS':
      return produce(state, draft => {
        draft.match = action.payload.match;
        draft.loading = false;
      });
    case '@match/ENTER_MATCH_SUCCESS':
      return produce(state, draft => {
        draft.match = action.payload.match;
        draft.loading = false;
      });
    case '@match/START_MATCH_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@match/CREATE_MATCH_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@match/START_MATCH_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
