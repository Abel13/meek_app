import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { loadPlayersSuccess, loadPlayersFailure } from './actions';

export function* loadPlayers({ payload }) {
  try {
    const { matchId } = payload;

    // const response = await api.get(`usersmatch/${match.secure_id}`);
    const response = yield call(api.get, `usersmatch/${matchId}`);

    const players = response.data;

    yield put(loadPlayersSuccess(players));
  } catch (error) {
    Alert.alert('Erro ao entrar na sala', `Falha ao entrar na sala!`);
    yield put(loadPlayersFailure());
  }
}

export default all([takeLatest('@match/LOAD_PLAYERS_REQUEST', loadPlayers)]);
