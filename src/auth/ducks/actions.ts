import { genericAsyncActions } from '../../utils/asyncRequest';

export interface UserAuthResponse {
  readonly userId: number;
  readonly privilegeLevel: number;
}

export const authenticateUser = genericAsyncActions<UserAuthResponse, void>();

export const logoutUser = genericAsyncActions<void, void>();

export type UserAuthenticationActions =
  | ReturnType<typeof authenticateUser.loading>
  | ReturnType<typeof authenticateUser.loaded>
  | ReturnType<typeof authenticateUser.failed>
  | ReturnType<typeof logoutUser.loading>
  | ReturnType<typeof logoutUser.loaded>
  | ReturnType<typeof logoutUser.failed>;
