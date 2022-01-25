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

export function betRequest(bet, roundId) {
  return {
    type: '@round/PUT_BET_REQUEST',
    payload: { bet, roundId },
  };
}

export function betSuccess(data) {
  return {
    type: '@round/PUT_BET_SUCCESS',
    payload: { data },
  };
}

export function betFailure() {
  return {
    type: '@round/PUT_BET_FAILURE',
  };
}
