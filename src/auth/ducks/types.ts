import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../store';
import { AsyncRequest } from '../../utils/asyncRequest';
import { AuthClient } from '../authClient';
import { TokenService } from '../token';
import { UserAuthenticationActions } from './actions';

export interface UserAuthenticationReducerState {
  readonly tokens: AsyncRequest<TokenPayload, any>;
}

export interface UserAuthenticationExtraArgs {
  readonly authClient: AuthClient;
  readonly tokenService: TokenService;
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
export interface SetContactsRequest {
  mainContact: AdultContact;
  additionalContacts: AdditionalContact[];
  children: ChildContact[];
}

interface Contact {
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string; // YYYY-MM-DD
  readonly phoneNumber: string;
  readonly pronouns: string;
  readonly allergies: string | null;
  readonly diagnosis: string | null;
  readonly medications: string | null;
  readonly notes: string | null;
  readonly profilePicture: string | null;
  readonly referrer: string | null;
}

interface AdultContact extends Contact {
  readonly email: string;
}

interface AdditionalContact extends AdultContact {
  readonly shouldSendEmails: boolean;
}

interface ChildContact extends Contact {
  readonly school: string;
  readonly schoolYear: string;
}

export interface TokenPayload {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface RefreshTokenResponse {
  readonly freshAccessToken: string;
}

export enum PrivilegeLevel {
  NONE = -1,
  STANDARD = 0,
  ADMIN = 1,
}

export const NO_USER_ID = -1;
