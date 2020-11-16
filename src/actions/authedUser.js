export const LOGIN_AUTHED_USER = 'LOGIN_AUTHED_USER'
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

export function loginAuthedUser(id) {
  return {
    type: LOGIN_AUTHED_USER,
    id,
  };
}

export function logoutAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  };
}