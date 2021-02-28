import AppAxiosInstance from '../axios';
import { authenticateUser, logoutUser } from './actions';
import {
  LoginRequest,
  SetContactsRequest,
  SignupRequest,
  TokenPayload,
  UserAuthenticationThunkAction,
} from './types';

export const login = (
  loginRequest: LoginRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient, tokenService }): Promise<void> => {
    return authClient
      .login(loginRequest)
      .then((response: TokenPayload) => {
        // TODO: move this side effect somewhere else
        AppAxiosInstance.defaults.headers['X-Access-Token'] =
          response.accessToken;
        tokenService.setRefreshToken(response.refreshToken);
        dispatch(authenticateUser.loaded(response));
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

export const signup = (
  signupRequest: SignupRequest,
  contactInfo: SetContactsRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient, tokenService }): Promise<void> => {
    return authClient
      .signup(signupRequest)
      .then((response) => {
        // TODO: move this side effect somewhere else
        AppAxiosInstance.defaults.headers['X-Access-Token'] =
          response.accessToken;
        tokenService.setRefreshToken(response.refreshToken);
        dispatch(authenticateUser.loaded(response));
        authClient.setContacts(contactInfo, response.accessToken);
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

export const logout = (): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient, tokenService }): Promise<void> => {
    const refreshToken = tokenService.getRefreshToken();
    if (refreshToken === null) {
      dispatch(logoutUser.loaded());
      return Promise.resolve();
    }
    delete AppAxiosInstance.defaults.headers['X-Access-Token'];
    return authClient
      .logout(refreshToken)
      .then(() => {
        tokenService.removeAccessToken();
        tokenService.removeRefreshToken();
        dispatch(logoutUser.loaded());
      })
      .catch(() => {
        tokenService.removeAccessToken();
        tokenService.removeRefreshToken();
        dispatch(logoutUser.failed());
      });
  };
};
