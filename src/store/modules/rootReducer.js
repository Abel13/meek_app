import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import match from './match/reducer';
import matchPlayers from './matchPlayers/reducer';

export default combineReducers({ auth, user, match, matchPlayers });
