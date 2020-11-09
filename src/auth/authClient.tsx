import Axios from './axios';
import {
  TokenResponse,
  LoginRequest,
  SignupRequest,
  RefreshTokenResponse,
} from './ducks/types';

export interface AuthClient {
  login: (user: LoginRequest) => Promise<TokenResponse>;
  signup: (user: SignupRequest) => Promise<TokenResponse>;
  logout: (refreshToken: string) => Promise<void>;
  refresh: (refreshToken: string) => Promise<RefreshTokenResponse>;
}

export enum API_ROUTE {
  LOGIN = '/api/v1/user/login/',
  SIGNUP = '/api/v1/user/signup/',
  REFRESH = '/api/v1/user/login/refresh/',
}

const login: (user: LoginRequest) => Promise<TokenResponse> = (
  user: LoginRequest,
) => Axios.post(API_ROUTE.LOGIN, user).then((response) => response.data);

const signup: (user: SignupRequest) => Promise<TokenResponse> = (
  user: SignupRequest,
) => Axios.post(API_ROUTE.SIGNUP, user).then((response) => response.data);

const logout: (refreshToken: string) => Promise<void> = (
  refreshToken: string,
) =>
  Axios.delete(API_ROUTE.LOGIN, {
    headers: {
      'X-Refresh-Token': refreshToken,
    },
    // eslint-disable-next-line
  }).then(() => {});

const refresh: (refreshToken: string) => Promise<RefreshTokenResponse> = (
  refreshToken: string,
) =>
  Axios.post(API_ROUTE.REFRESH, null, {
    headers: {
      'X-Refresh-Token': refreshToken,
    },
  }).then((response) => response.data);

const Client: AuthClient = Object.freeze({
  login,
  signup,
  logout,
  refresh,
});

export default Client;
