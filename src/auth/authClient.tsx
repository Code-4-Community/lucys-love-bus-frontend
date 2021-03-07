import axios, { AxiosInstance } from 'axios';
import {
  LoginRequest,
  RefreshTokenResponse,
  SetContactsRequest,
  SignupRequest,
  TokenPayload,
} from './ducks/types';

export interface AuthClient {
  readonly login: (user: LoginRequest) => Promise<TokenPayload>;
  readonly signup: (user: SignupRequest) => Promise<TokenPayload>;
  readonly setContacts: (
    contactInfo: SetContactsRequest,
    accessToken: string,
  ) => Promise<void>;
  readonly logout: (refreshToken: string) => Promise<void>;
  readonly refresh: (refreshToken: string) => Promise<RefreshTokenResponse>;
}

export enum API_ROUTE {
  LOGIN = '/api/v1/user/login/',
  SIGNUP = '/api/v1/user/signup/',
  REFRESH = '/api/v1/user/login/refresh/',
  SET_CONTACTS = '/api/v1/protected/user/contact_info/',
}

const AuthAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const login: (user: LoginRequest) => Promise<TokenPayload> = (
  user: LoginRequest,
) =>
  AuthAxiosInstance.post(API_ROUTE.LOGIN, user).then(
    (response) => response.data,
  );

const signup: (user: SignupRequest) => Promise<TokenPayload> = (
  user: SignupRequest,
) =>
  AuthAxiosInstance.post(API_ROUTE.SIGNUP, user).then(
    (response) => response.data,
  );

const setContacts: (
  contactInfo: SetContactsRequest,
  accessToken: string,
) => Promise<void> = (contactInfo: SetContactsRequest, accessToken: string) =>
  AuthAxiosInstance.post(API_ROUTE.SET_CONTACTS, contactInfo, {
  }).then((response) => response.data);

const logout: (refreshToken: string) => Promise<void> = (
  refreshToken: string,
) =>
  AuthAxiosInstance.delete(API_ROUTE.LOGIN, {
    headers: {
      'X-Refresh-Token': refreshToken,
    },
    // eslint-disable-next-line
  }).then(() => {});

const refresh: (refreshToken: string) => Promise<RefreshTokenResponse> = (
  refreshToken: string,
) =>
  AuthAxiosInstance.post(API_ROUTE.REFRESH, null, {
    headers: {
      'X-Refresh-Token': refreshToken,
    },
  }).then((response) => response.data);

const Client: AuthClient = Object.freeze({
  login,
  signup,
  logout,
  refresh,
  setContacts,
});

export default Client;
