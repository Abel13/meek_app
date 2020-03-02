import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import match from './match/sagas';
import matchPlayers from './matchPlayers/sagas';

export default function* rootSaga() {
  return yield all([auth, user, match, matchPlayers]);
}
