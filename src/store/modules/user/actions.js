export function signUpRequest(username, email, password, passwordConfirmation) {
  return {
    type: '@user/SIGN_UP_REQUEST',
    payload: {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
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
