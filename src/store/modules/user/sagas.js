import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';
import * as NavigationService from '../../../services/NavigationService';

import { signUpSuccess, signUpFailure } from './actions';

export function* signUp({ payload }) {
  try {
    // eslint-disable-next-line camelcase
    const { username, email, password, password_confirmation } = payload;

    const response = yield call(api.post, 'users', {
      username,
      email,
      password,
      password_confirmation,
    });

    const secureId = response.data.secure_id;

    yield put(signUpSuccess(secureId, payload));

    yield NavigationService.navigate('SignIn');
  } catch (error) {
    // const { data } = error.response;
    const message =
      'Dados inválidos, preencha todos os campos e tente novamente!';

    console.log(error);

    Alert.alert('Erro no Cadastro', message);
    yield put(signUpFailure());
  }
}
export default all([takeLatest('@user/SIGN_UP_REQUEST', signUp)]);
