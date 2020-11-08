import Axios from './axios';
import Token from './token';
import {
  API_ROUTE,
  TokenResponse,
  LoginRequest,
  SignupRequest,
} from './ducks/types';

export interface AuthClient {
  login: (user: LoginRequest) => Promise<TokenResponse>;
  signup: (user: SignupRequest) => Promise<TokenResponse>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const login: (user: LoginRequest) => Promise<TokenResponse> = async (
  user: LoginRequest,
) => Axios.post(API_ROUTE.LOGIN, user).then((response) => response.data);

const signup: (user: SignupRequest) => Promise<TokenResponse> = async (
  user: SignupRequest,
) => Axios.post(API_ROUTE.SIGNUP, user).then((response) => response.data);

const logout: () => Promise<void> = async () =>
  Axios.delete(API_ROUTE.LOGIN, {
    headers: {
      'X-Refresh-Token': Token.getRefreshToken(),
    },
  });

const refresh: () => Promise<void> = async () =>
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

const Client: AuthClient = Object.freeze({
  login,
  signup,
  logout,
  refresh,
});

export default Client;
