import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';
import * as NavigationService from '../../../services/NavigationService';

import {
  createMatchSuccess,
  createMatchFailure,
  enterMatchSuccess,
  startMatchSuccess,
  startMatchFailure,
} from './actions';

export function* createMatch({ payload }) {
  try {
    const { name } = payload;
    const response = yield call(api.post, 'matches', { name });

    const { match } = response.data;

    yield put(createMatchSuccess(match));

    yield NavigationService.navigate('Room');
  } catch (error) {
    const { data } = error.response;
    console.log(data);
    const message = 'Dados inválidos, tente novamente!';
    Alert.alert('Erro ao criar a partida', message);
    yield put(createMatchFailure());
  }
}

export function* enterMatch({ payload }) {
  try {
    const { matchId } = payload;
    const response = yield call(api.post, 'usermatch', { match_id: matchId });

    const { match } = response.data;

    yield put(enterMatchSuccess(match));

    yield NavigationService.navigate('Room');
  } catch (error) {
    const { data } = error.response;
    console.log(data);
    const message = 'Ocorreu uma falha inesperada, tente novamente!';
    Alert.alert('Erro ao entrar na partida', message);
    yield put(createMatchFailure());
  }
}

export function* startMatch({ payload }) {
  try {
    const { matchId } = payload;

    yield call(api.put, `matches/${matchId}`);

    yield put(startMatchSuccess());

    yield NavigationService.navigate('Table');
  } catch (error) {
    const { data } = error.response;
    console.log(data);
    const message = 'Ocorreu uma falha inesperada, tente novamente!';
    Alert.alert('Erro ao entrar na partida', message);
    yield put(startMatchFailure());
  }
}

export default all([
  takeLatest('@match/CREATE_MATCH_REQUEST', createMatch),
  takeLatest('@match/ENTER_MATCH_REQUEST', enterMatch),
  takeLatest('@match/START_MATCH_REQUEST', startMatch),
]);
