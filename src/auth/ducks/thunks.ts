import {
  LoginRequest,
  SignupRequest,
  TokenResponse,
  UserAuthenticationThunkAction,
} from './types';
import {
  AUTHENTICATION_FAILED_ACTION,
  AUTHENTICATION_SUCCESS_ACTION,
} from './actions';
import tokenService from '../token';

export const login = (
  loginRequest: LoginRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    return authClient
      .login(loginRequest)
      .then((response: TokenResponse) => {
        tokenService.setAccessToken(response.accessToken);
        tokenService.setRefreshToken(response.refreshToken);
        dispatch({
          type: AUTHENTICATION_SUCCESS_ACTION,
          payload: {
            userId: tokenService.getUserID(),
            privilegeLevel: tokenService.getPrivilegeLevel(),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTHENTICATION_FAILED_ACTION,
          payload: error,
        });
      });
  };
};

export const signup = (
  signupRequest: SignupRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    return authClient
      .signup(signupRequest)
      .then((response) => {
        tokenService.setAccessToken(response.accessToken);
        tokenService.setRefreshToken(response.refreshToken);
        dispatch({
          type: AUTHENTICATION_SUCCESS_ACTION,
          payload: {
            userId: tokenService.getUserID(),
            privilegeLevel: tokenService.getPrivilegeLevel(),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTHENTICATION_FAILED_ACTION,
          payload: error,
        });
      });
  };
};
