import { UserAuthenticationFailedResponse } from './types';
import { Action } from 'redux';

export const AUTHENTICATION_SUCCESS_ACTION = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILED_ACTION = 'AUTHENTICATION_FAILED';

interface UserAuthResponse {
  readonly userId: number;
  readonly privilegeLevel: number;
}

interface AuthenticationSuccess extends Action {
  payload: UserAuthResponse;
}

interface AuthenticationFailed extends Action {
  payload: UserAuthenticationFailedResponse;
}

export type UserAuthenticationActions =
  | AuthenticationSuccess
  | AuthenticationFailed;
