import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  roundCards: [],
};

export default function round(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@round/GET_ROUND_CARDS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@round/GET_ROUND_CARDS_SUCCESS':
      return produce(state, draft => {
        draft.loading = true;
        draft.roundCards = action.payload.cards;
      });
    case '@round/GET_ROUND_CARDS_FAILURE':
      return produce(state, draft => {
        draft.loading = true;
      });

    case '@round/GET_ACTUAL_ROUND_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@round/GET_ACTUAL_ROUND_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
        draft.round = action.payload.round;
      });
    case '@round/GET_ACTUAL_ROUND_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
