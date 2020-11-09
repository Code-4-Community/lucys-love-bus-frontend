import Axios from './axios';
import Token from './token';
import {
  TokenResponse,
  LoginRequest,
  SignupRequest,
  RefreshTokenResponse,
} from './ducks/types';

export interface AuthClient {
  login: (user: LoginRequest) => Promise<TokenResponse>;
  signup: (user: SignupRequest) => Promise<TokenResponse>;
  logout: () => Promise<void>;
  refresh: () => Promise<RefreshTokenResponse>;
}

export enum API_ROUTE {
  LOGIN = '/api/v1/user/login/',
  SIGNUP = '/api/v1/user/signup/',
  REFRESH = '/api/v1/user/login/refresh/',
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
  }).then(() => {});

const refresh: () => Promise<RefreshTokenResponse> = async () =>
  Axios.post(API_ROUTE.REFRESH, null, {
    headers: {
      'X-Refresh-Token': Token.getRefreshToken(),
    },
  }).then((response) => response.data);

const Client: AuthClient = Object.freeze({
  login,
  signup,
  logout,
  refresh,
});

export default Client;
