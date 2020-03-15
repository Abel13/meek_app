import produce from 'immer';

const INITIAL_STATE = {
  turn: null,
  myTurn: null,
  playedCards: [],
};

export default function turn(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@turn/GET_ACTUAL_TURN_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@turn/GET_ACTUAL_TURN_SUCCESS':
      return produce(state, draft => {
        draft.loading = true;
        draft.turn = action.payload.turn;
      });
    case '@turn/GET_ACTUAL_TURN_FAILURE':
      return produce(state, draft => {
        draft.loading = true;
      });

    case '@turn/GET_PLAYED_CARDS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@turn/GET_PLAYED_CARDS_SUCCESS':
      return produce(state, draft => {
        draft.loading = true;
        draft.myTurn = action.payload.data.myPlayedCard;
        draft.playedCards = action.payload.data.playedCards;
      });
    case '@turn/GET_PLAYED_CARDS_FAILURE':
      return produce(state, draft => {
        draft.loading = true;
      });

    default:
      return state;
  }
}
