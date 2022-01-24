import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { loadPlayersSuccess, loadPlayersFailure } from './actions';

export function* loadPlayers({ payload }) {
  try {
    const { matchId } = payload;

    const response = yield call(api.get, `usersmatch/${matchId}`);

    const { players, started } = response.data;

    yield put(loadPlayersSuccess({ players, started }));
  } catch (error) {
    Alert.alert('Erro ao sincronizar dados', `Falha ao buscar informações!`);
    yield put(loadPlayersFailure());
  }
}

export default all([takeLatest('@match/LOAD_PLAYERS_REQUEST', loadPlayers)]);
