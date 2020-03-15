export function getActualTurnRequest(roundId) {
  return {
    type: '@turn/GET_ACTUAL_TURN_REQUEST',
    payload: { roundId },
  };
}

export function getActualTurnSuccess(turn) {
  return {
    type: '@turn/GET_ACTUAL_TURN_SUCCESS',
    payload: { turn },
  };
}

export function getActualTurnFailure() {
  return {
    type: '@turn/GET_ACTUAL_TURN_FAILURE',
  };
}

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
