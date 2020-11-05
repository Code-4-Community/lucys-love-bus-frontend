import { ThunkAction } from 'redux-thunk';
import { C4CState, C4CAction } from '../../index';
import { AuthClient } from '../authClient';

export interface UserState {
  readonly privilegeLevel: PrivilegeLevel;
  readonly userId: number;
}

export interface UserAuthenticationExtraArgs {
  readonly authClient: AuthClient;
}

export type UserAuthenticationThunkAction<R> = ThunkAction<
  R,
  C4CState,
  UserAuthenticationExtraArgs,
  C4CAction
>;

export interface LoginRequest {
  readonly username: string;
  readonly password: string;
}

export interface SignupRequest {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface TokenResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface UserAuthenticationFailedResponse {
  readonly error: any;
}

export enum API_ROUTE {
  LOGIN = '/api/v1/user/login/',
  SIGNUP = '/api/v1/user/signup/',
  REFRESH = '/api/v1/user/login/refresh/',
}

export enum LOCALSTORAGE_TOKEN_KEY {
  ACCESS = 'access_token',
  REFRESH = 'refresh_token',
}

export enum PrivilegeLevel {
  NONE = -1,
  STANDARD = 0,
  ADMIN = 1,
}
