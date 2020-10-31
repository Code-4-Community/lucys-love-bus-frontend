import Axios from './axios';
import Token from './token';
import { API_ROUTE, LoginRequest, SignupRequest } from './ducks/types';

export const login = async (user: LoginRequest) =>
  Axios.post(API_ROUTE.LOGIN, user).then((response) => {
    Token.setAccessToken(response.data.accessToken);
    Token.setRefreshToken(response.data.refreshToken);
  });

export const signup = async (user: SignupRequest) =>
  Axios.post(API_ROUTE.SIGNUP, user).then((response) => {
    Token.setAccessToken(response.data.accessToken);
    Token.setRefreshToken(response.data.refreshToken);
  });

export const logout = async () =>
  Axios.delete(API_ROUTE.LOGIN, {
    headers: {
      'X-Refresh-Token': Token.getRefreshToken(),
    },
  })
    .then(() => {
      Token.removeAccessToken();
      Token.removeRefreshToken();
    })
    .catch(() => {
      Token.removeAccessToken();
      Token.removeRefreshToken();
    });

export const refresh = async () =>
  Axios.post(API_ROUTE.REFRESH, null, {
    headers: {
      'X-Refresh-Token': Token.getRefreshToken(),
    },
  })
    .then((response) => {
      Token.setAccessToken(response.data.freshAccessToken);
    })
    .catch(() => {
      Token.removeAccessToken();
      Token.removeAccessToken();
    });
