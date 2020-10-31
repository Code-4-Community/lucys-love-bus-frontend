import Axios from './axios';
import Token from './token';
import {
  API_ROUTE,
  AuthResponse,
  LoginRequest,
  SignupRequest,
} from './ducks/types';

interface AuthClient {
  login: (user: LoginRequest) => Promise<AuthResponse>;
  signup: (user: SignupRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const login: (user: LoginRequest) => Promise<AuthResponse> = async (
  user: LoginRequest,
) => Axios.post(API_ROUTE.LOGIN, user).then((response) => response.data);

const signup: (user: SignupRequest) => Promise<AuthResponse> = async (
  user: SignupRequest,
) =>
  Axios.post(API_ROUTE.SIGNUP, user).then((response) => response.data);

const logout: () => Promise<void> = async () =>
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
