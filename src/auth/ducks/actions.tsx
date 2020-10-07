import { AuthenticationActionTypes, LOGIN, LoginRequest } from './types';

export const loginUser: (user: LoginRequest) => AuthenticationActionTypes = (
  user,
) => {
  return {
    type: LOGIN,
    payload: user,
  };
};
