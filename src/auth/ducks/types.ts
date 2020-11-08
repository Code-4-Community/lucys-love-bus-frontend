import { ThunkAction } from 'redux-thunk';
import { C4CState, C4CAction } from '../../store';
import { AuthClient } from '../authClient';
import { TokenService } from '../token';

export interface UserState {
  readonly privilegeLevel: PrivilegeLevel;
  readonly userId: number;
}

export interface UserAuthenticationExtraArgs {
  readonly authClient: AuthClient;
  readonly tokenService: TokenService;
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
  readonly fullName: string;
}

export interface TokenResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
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

export const NO_USER_ID = -1;
