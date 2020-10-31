import { AuthenticationActionTypes, AuthResponse, LOGIN, LoginRequest } from './types';

export const authenticateUser: (user: AuthResponse) => AuthenticationActionTypes = (
  user,
) => {
  return {
    type: LOGIN,
    payload: user,
  };
};
