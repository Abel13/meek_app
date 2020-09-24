import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import {
  getPlayedCardsSuccess,
  getPlayedCardsFailure,
  getCurrentPlayerSuccess,
  getPlayedCardsRequest,
} from './actions';

export function* getPlayedCards({ payload }) {
  try {
    const { turnId } = payload;

    console.log('GETTING CARDS', turnId);
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

    console.log('MATCH', matchId);
    const response = yield call(api.get, `current/${matchId}`);

    const { data } = response;
    yield put(getCurrentPlayerSuccess(data));
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível buscar as informações da partida!');
    console.log(error);
    yield put(getPlayedCardsFailure());
  }
}

export function* playCard({ payload }) {
  try {
    const { card, turnId } = payload;
    yield call(api.put, `play/${turnId}`, { card });
  } catch (error) {
    Alert.alert('Erro', error);
  }
}

export default all([
  takeLatest('@turn/GET_PLAYED_CARDS_REQUEST', getPlayedCards),
  takeLatest('@turn/GET_CURRENT_PLAYER_REQUEST', getCurrentPlayer),
  takeLatest('@turn/PLAY_CARD_REQUEST', playCard),
]);
