import { PrivilegeLevel, TokenPayload } from './types';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';

export const getPrivilegeLevel = (
  tokens: AsyncRequest<TokenPayload, any>,
): PrivilegeLevel => {
  if (tokens.kind === AsyncRequestKinds.Completed) {
    const payload = JSON.parse(atob(tokens.result.accessToken.split('.')[1]));
    return payload.privilegeLevel;
  }
  return PrivilegeLevel.NONE;
};

export const isTokenValid = (
  token: string
): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload && Math.round(Date.now() / 1000) < payload.exp;
}
