export function signUpRequest(
  username,
  email,
  password,
  // eslint-disable-next-line camelcase
  password_confirmation
) {
  return {
    type: '@user/SIGN_UP_REQUEST',
    payload: { username, email, password, password_confirmation },
  };
}

export function signUpSuccess(secureId, user) {
  return {
    type: '@user/SIGN_UP_SUCCESS',
    payload: { secureId, user },
  };
}

export function signUpFailure() {
  return {
    type: '@user/SIGN_UP_FAILURE',
  };
}
