import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  roundCards: [],
};

export default function round(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@round/GET_ROUND_CARDS_REQUEST':
        draft.loading = true;
        return draft;
      case '@round/GET_ROUND_CARDS_SUCCESS':
        draft.loading = true;
        draft.roundCards = action.payload.cards;
        return draft;
      case '@round/GET_ROUND_CARDS_FAILURE':
        draft.loading = true;
        return draft;
      case '@round/PUT_BET_REQUEST':
        draft.loading = true;
        return draft;
      case '@round/PUT_BET_SUCCESS':
        draft.loading = false;
        return draft;
      case '@round/PUT_BET_FAILURE':
        draft.loading = false;
        return draft;
      default:
        return state;
    }
  });
}
