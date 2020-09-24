import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  turn: null,
  round: null,
  turnCardsPlayed: null, // my position and card id
  currentPlayer: null,
  playedCards: [],
  stepBet: false,
  stepPlay: false,
  blockedBet: null,
  endOfBet: false,
  betsPlaced: [],
};

export default function turn(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@turn/GET_PLAYED_CARDS_REQUEST':
        draft.loading = true;
        return draft;
      case '@turn/GET_PLAYED_CARDS_SUCCESS':
        draft.loading = true;
        draft.turnCardsPlayed = action.payload.data.myPlayedCard;
        draft.playedCards = action.payload.data.playedCards;
        return draft;
      case '@turn/GET_PLAYED_CARDS_FAILURE':
        draft.loading = true;
        return draft;
      case '@turn/GET_CURRENT_PLAYER_REQUEST':
        draft.loading = true;
        return draft;
      case '@turn/GET_CURRENT_PLAYER_SUCCESS':
        draft.currentPlayer = action.payload.data.actualPlayer;
        draft.stepBet = action.payload.data.stepBet;
        draft.stepPlay = action.payload.data.stepPlay;
        draft.endOfBet = action.payload.data.endOfBet;
        draft.betsPlaced = action.payload.data.betsPlaced;
        draft.blockedBet = action.payload.data.blockedBet;
        draft.turn = action.payload.data.turn;
        draft.round = action.payload.data.round;
        draft.loading = false;
        return draft;
      case '@turn/GET_CURRENT_PLAYER_FAILURE':
        draft.loading = false;
        return draft;
      case '@turn/PLAY_CARD_REQUEST':
        draft.loading = true;
        return draft;
      default:
        return state;
    }
  });
}
