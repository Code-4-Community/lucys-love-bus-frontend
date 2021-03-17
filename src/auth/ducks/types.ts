import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../store';
import { AsyncRequest } from '../../utils/asyncRequest';
import { AuthClient } from '../authClient';
import { UserAuthenticationActions } from './actions';

export interface UserAuthenticationReducerState {
  readonly tokens: AsyncRequest<TokenPayload, any>;
}

export interface UserAuthenticationExtraArgs {
  readonly authClient: AuthClient;
}

export type UserAuthenticationThunkAction<R> = ThunkAction<
  R,
  C4CState,
  UserAuthenticationExtraArgs,
  UserAuthenticationActions
>;

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface SignupRequest {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly location: {
    readonly address: string;
    readonly city: string;
    readonly state: string;
    readonly zipCode: string;
  };
  readonly photoRelease: boolean;
}

export interface TokenPayload {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface RefreshTokenResponse {
  readonly freshAccessToken: string;
}

export enum PrivilegeLevel {
  NONE = 'none',
  STANDARD = 'standard',
  ADMIN = 'admin',
}

export const NO_USER_ID = -1;
