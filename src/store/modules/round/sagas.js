import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import {
  getRoundCardsSuccess,
  getRoundCardsFailure,
  getActualRoundSuccess,
  getActualRoundFailure,
} from './actions';

export function* getRoundCards({ payload }) {
  try {
    const { roundId } = payload;

    const response = yield call(api.get, `roundcards/${roundId}`);

    const cards = response.data;

    yield put(getRoundCardsSuccess(cards));
  } catch (error) {
    Alert.alert('Erro', `Não foi possível carregar as cartas!`);
    yield put(getRoundCardsFailure());
  }
}

export function* getRound({ payload }) {
  try {
    const { matchId } = payload;

    const response = yield call(api.get, `rounds/${matchId}`);

    const { round } = response.data;

    yield put(getActualRoundSuccess(round));
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível carregar a rodada');
    yield put(getActualRoundFailure());
  }
}

export default all([
  takeLatest('@round/GET_ROUND_CARDS_REQUEST', getRoundCards),
  takeLatest('@round/GET_ACTUAL_ROUND_REQUEST', getRound),
]);
