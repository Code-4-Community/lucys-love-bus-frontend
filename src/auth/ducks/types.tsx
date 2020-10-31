export interface AuthenticationState {
  readonly privilegeLevel: PrivilegeLevel;
  readonly userId: number;
}

export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const LOGOUT = 'LOGOUT'
export const REFRESH = 'REFRESH'

interface LoginAction {
  type: typeof LOGIN
  payload: LoginRequest
}

interface SignupAction {
  type: typeof SIGNUP
  payload: LoginRequest
}

export type AuthenticationActionTypes = LoginAction | SignupAction;

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface SignupRequest {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
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