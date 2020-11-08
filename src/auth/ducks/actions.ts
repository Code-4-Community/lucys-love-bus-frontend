import { Action } from 'redux';

export const AUTHENTICATION_SUCCESS_ACTION = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILED_ACTION = 'AUTHENTICATION_FAILED';

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

export type UserAuthenticationActions =
  | AuthenticationSuccess
  | AuthenticationFailed;
