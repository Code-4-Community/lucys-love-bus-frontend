import axios, { AxiosInstance } from 'axios';
import {
  LoginRequest,
  RefreshTokenResponse,
  SignupRequest,
  TokenPayload,
  ForgotPasswordRequest,
  ForgotPasswordResetRequest,
} from './ducks/types';

export interface AuthClient {
  login: (user: LoginRequest) => Promise<TokenPayload>;
  signup: (user: SignupRequest) => Promise<TokenPayload>;
  logout: (refreshToken: string) => Promise<void>;
  refresh: (refreshToken: string) => Promise<RefreshTokenResponse>;
  forgotPassword: (user: ForgotPasswordRequest) => Promise<void>;
  forgotPasswordReset: (user: ForgotPasswordResetRequest) => Promise<void>;
  verifyEmail: (secretKey: string) => Promise<void>;
}

export enum API_ROUTE {
  LOGIN = '/api/v1/user/login/',
  SIGNUP = '/api/v1/user/signup/',
  REFRESH = '/api/v1/user/login/refresh/',
  FORGOT_PASSWORD = '/api/v1/user/forgot_password/request',
  FORGOT_PASSWORD_RESET = '/api/v1/user/forgot_password/reset',
  VERIFY_EMAIL = '/api/v1/user/verify/',
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

const forgotPassword: (user: ForgotPasswordRequest) => Promise<void> = (
  user: ForgotPasswordRequest,
) => AuthAxiosInstance.post(API_ROUTE.FORGOT_PASSWORD, user);

const forgotPasswordReset: (
  user: ForgotPasswordResetRequest,
) => Promise<void> = (user: ForgotPasswordResetRequest) =>
  AuthAxiosInstance.post(API_ROUTE.FORGOT_PASSWORD_RESET, user);

const verifyEmail: (secretKey: string) => Promise<void> = (secretKey: string) =>
  AuthAxiosInstance.get(API_ROUTE.VERIFY_EMAIL + secretKey);

const Client: AuthClient = Object.freeze({
  login,
  signup,
  logout,
  refresh,
  forgotPassword,
  forgotPasswordReset,
  verifyEmail,
});

export default Client;
