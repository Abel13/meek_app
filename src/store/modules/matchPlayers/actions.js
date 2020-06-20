export function loadPlayersRequest(matchId) {
  return {
    type: '@match/LOAD_PLAYERS_REQUEST',
    payload: { matchId },
  };
}

export function loadPlayersSuccess({ players, started }) {
  return {
    type: '@match/LOAD_PLAYERS_SUCCESS',
    payload: { players, started },
  };
}

export function loadPlayersFailure() {
  return {
    type: '@match/LOAD_PLAYERS_FAILURE',
  };
}
