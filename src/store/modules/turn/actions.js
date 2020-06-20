export function getPlayedCardsRequest(turnId) {
  return {
    type: '@turn/GET_PLAYED_CARDS_REQUEST',
    payload: { turnId },
  };
}

export function getPlayedCardsSuccess(data) {
  return {
    type: '@turn/GET_PLAYED_CARDS_SUCCESS',
    payload: { data },
  };
}

export function getPlayedCardsFailure() {
  return {
    type: '@turn/GET_PLAYED_CARDS_FAILURE',
  };
}

export function updateGame(matchId) {
  return {
    type: '@turn/GET_CURRENT_PLAYER_REQUEST',
    payload: { matchId },
  };
}

export function getCurrentPlayerSuccess(data) {
  return {
    type: '@turn/GET_CURRENT_PLAYER_SUCCESS',
    payload: { data },
  };
}

export function getCurrentPlayerFailure() {
  return {
    type: '@turn/GET_CURRENT_PLAYER_FAILURE',
  };
}
