import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import match from './match/reducer';
import matchPlayers from './matchPlayers/reducer';
import round from './round/reducer';
import turn from './turn/reducer';

export default combineReducers({
  auth,
  user,
  match,
  matchPlayers,
  round,
  turn,
});
