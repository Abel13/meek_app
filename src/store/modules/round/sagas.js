import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import {
  getRoundCardsSuccess,
  getRoundCardsFailure,
  getActualRoundSuccess,
  getActualRoundFailure,
  betFailure,
  betSuccess,
} from './actions';

export function* getRoundCards({ payload }) {
  try {
    const { roundId } = payload;

    const response = yield call(api.get, `roundcards/${roundId}`);

    const cards = response.data;

    yield put(getRoundCardsSuccess(cards));
  } catch (error) {
    Alert.alert('Erro', `Não foi possível carregar as cartas da rodada!`);
    console.log(error);
    yield put(getRoundCardsFailure());
  }
}

export function* putBet({ payload }) {
  try {
    const { bet, roundId } = payload;

    const response = yield call(api.put, `rounds/${roundId}`, { bet });

    yield put(betSuccess(response.data));
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível realizar a aposta');
    yield put(betFailure());
  }
}

export default all([
  takeLatest('@round/GET_ROUND_CARDS_REQUEST', getRoundCards),
  takeLatest('@round/PUT_BET_REQUEST', putBet),
]);
