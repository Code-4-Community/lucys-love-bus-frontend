import { Action } from 'redux';

export const AUTHENTICATION_SUCCESS_ACTION = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILED_ACTION = 'AUTHENTICATION_FAILED';
export const AUTHENTICATION_LOGOUT_ACTION = 'AUTHENTICATION_LOGOUT';

export interface UserAuthResponse {
  readonly userId: number;
  readonly privilegeLevel: number;
}

export interface AuthenticationSuccess extends Action {
  payload: UserAuthResponse;
}

export interface AuthenticationError {
  readonly error: any;
}

export interface AuthenticationFailed extends Action {
  payload: AuthenticationError;
}

export interface AuthenticationLogout extends Action {}

export type UserAuthenticationActions =
  | AuthenticationSuccess
  | AuthenticationFailed
  | AuthenticationLogout;
