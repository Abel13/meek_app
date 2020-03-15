export function getRoundCardsRequest(roundId) {
  return {
    type: '@round/GET_ROUND_CARDS_REQUEST',
    payload: { roundId },
  };
}

export function getRoundCardsSuccess(cards) {
  return {
    type: '@round/GET_ROUND_CARDS_SUCCESS',
    payload: { cards },
  };
}

export function getRoundCardsFailure() {
  return {
    type: '@round/GET_ROUND_CARDS_FAILURE',
  };
}

export function getActualRoundRequest(matchId) {
  return {
    type: '@round/GET_ACTUAL_ROUND_REQUEST',
    payload: { matchId },
  };
}

export function getActualRoundSuccess(round) {
  return {
    type: '@round/GET_ACTUAL_ROUND_SUCCESS',
    payload: { round },
  };
}

export function getActualRoundFailure() {
  return {
    type: '@round/GET_ACTUAL_ROUND_FAILURE',
  };
}
