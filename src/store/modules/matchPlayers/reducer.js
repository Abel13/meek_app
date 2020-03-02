import produce from 'immer';
// import { AsyncStorage } from 'react-native';

const INITIAL_STATE = {
  players: [],
  loading: false,
};

export default function matchPlayers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@match/LOAD_PLAYERS_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@match/LOAD_PLAYERS_SUCCESS':
      return produce(state, draft => {
        draft.players = action.payload.players;
      });
    case '@match/LOAD_PLAYERS_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
