import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import {
  getPlayedCardsSuccess,
  getPlayedCardsFailure,
  getActualTurnSuccess,
  getActualTurnFailure,
} from './actions';

export function* getActualTurn({ payload }) {
  try {
    const { roundId } = payload;
    const response = yield call(api.get, `turns/${roundId}`);

    const { turn } = response.data;

    yield put(getActualTurnSuccess(turn));
  } catch (error) {
    Alert.alert('Erro', `Falha ao conectar ao turno!`);
    yield put(getActualTurnFailure());
  }
}

export function* getPlayedCards({ payload }) {
  try {
    const { turnId } = payload;

    const response = yield call(api.get, `usercard/${turnId}`);

    const { data } = response;

    yield put(getPlayedCardsSuccess(data));
  } catch (error) {
    Alert.alert('Erro', `Não foi possível carregar as cartas!`);
    yield put(getPlayedCardsFailure());
  }
}

export default all([
  takeLatest('@turn/GET_ACTUAL_TURN_REQUEST', getActualTurn),
  takeLatest('@turn/GET_PLAYED_CARDS_REQUEST', getPlayedCards),
]);
