export function loadPlayersRequest(matchId) {
  return {
    type: '@match/LOAD_PLAYERS_REQUEST',
    payload: { matchId },
  };
}

export function loadPlayersSuccess(players) {
  return {
    type: '@match/LOAD_PLAYERS_SUCCESS',
    payload: { players },
  };
}

export function loadPlayersFailure() {
  return {
    type: '@match/LOAD_PLAYERS_FAILURE',
  };
}
