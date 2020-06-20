import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import {
  getPlayedCardsSuccess,
  getPlayedCardsFailure,
  getActualTurnSuccess,
  getActualTurnFailure,
  getCurrentPlayerSuccess,
} from './actions';

export function* getPlayedCards({ payload }) {
  try {
    const { turnId } = payload;

    const response = yield call(api.get, `usercard/${turnId}`);

    const { data } = response;

    yield put(getPlayedCardsSuccess(data));
  } catch (error) {
    Alert.alert('Erro', `Não foi possível carregar as cartas jogadas!`);
    yield put(getPlayedCardsFailure());
  }
}

export function* getCurrentPlayer({ payload }) {
  try {
    const { matchId } = payload;

    const response = yield call(api.get, `current/${matchId}`);

    const { data } = response;
    yield put(getCurrentPlayerSuccess(data));
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível buscar as informações da partida!');
    console.log(error);
    yield put(getPlayedCardsFailure());
  }
}

export default all([
  takeLatest('@turn/GET_PLAYED_CARDS_REQUEST', getPlayedCards),
  takeLatest('@turn/GET_CURRENT_PLAYER_REQUEST', getCurrentPlayer),
]);
