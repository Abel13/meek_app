import produce from 'immer';

const INITIAL_STATE = {
  players: [],
  matchStarted: false,
  loading: false,
};

export default function matchPlayers(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@match/LOAD_PLAYERS_REQUEST':
        draft.loading = true;
        return draft;
      case '@turn/GET_CURRENT_PLAYER_SUCCESS':
        draft.players = action.payload.data.usersMatch;
        return draft;
      case '@match/LOAD_PLAYERS_SUCCESS':
        draft.players = action.payload.players;
        draft.matchStarted = action.payload.started;
        return draft;
      case '@match/LOAD_PLAYERS_FAILURE':
        draft.loading = false;
        return draft;
      case '@match/ENTER_MATCH_REQUEST':
        draft.players = [];
        return draft;
      default:
        return draft;
    }
  });
}
