export function createMatchRequest(name) {
  return {
    type: '@match/CREATE_MATCH_REQUEST',
    payload: { name },
  };
}

export function enterMatchRequest(matchId) {
  return {
    type: '@match/ENTER_MATCH_REQUEST',
    payload: { matchId },
  };
}

export function startMatchRequest(matchId) {
  return {
    type: '@match/START_MATCH_REQUEST',
    payload: { matchId },
  };
}

export function createMatchSuccess(match) {
  return {
    type: '@match/CREATE_MATCH_SUCCESS',
    payload: { match },
  };
}

export function enterMatchSuccess(match) {
  return {
    type: '@match/ENTER_MATCH_SUCCESS',
    payload: { match },
  };
}

export function startMatchSuccess() {
  return {
    type: '@match/START_MATCH_SUCCESS',
  };
}

export function createMatchFailure() {
  return {
    type: '@match/CREATE_MATCH_FAILURE',
  };
}

export function enterMatchFailure() {
  return {
    type: '@match/ENTER_MATCH_FAILURE',
  };
}

export function startMatchFailure() {
  return {
    type: '@match/START_MATCH_FAILURE',
  };
}

// export function loadMatchesRequest() {
//   return {
//     type: '@match/LOAD_MATCHES_REQUEST',
//   };
// }
