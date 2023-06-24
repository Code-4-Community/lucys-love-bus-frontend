import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';
import { PrivilegeLevel, TokenPayload } from '../ducks/types';
import { getPrivilegeLevel } from '../ducks/selectors';

describe('User Authentication Selectors', () => {
  describe('getPrivilegeLevel', () => {
    it('returns standard privilege level when appropriate token has been loaded', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6InN0YW5kYXJkIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.FEjX15JppwId5PCMd0Rc97yEOXmxWIKwWF6yzWqSLjw',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6InN0YW5kYXJkIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.s1vVyOW1hENuPqBscnW49eupxoMyrlw3NmZ2S_UUbNo',
      };
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestCompleted<
        TokenPayload,
        any
      >(payload);

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.STANDARD);
    });

    it('returns admin privilege level when appropriate token has been loaded', () => {
      const payload: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6ImFkbWluIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.FEjX15JppwId5PCMd0Rc97yEOXmxWIKwWF6yzWqSLjw',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcml2aWxlZ2VMZXZlbCI6ImFkbWluIiwiaXNzIjoiYzRjIiwiZXhwIjoxNjA1NDgwMzIzLCJ1c2VySWQiOjF9.s1vVyOW1hENuPqBscnW49eupxoMyrlw3NmZ2S_UUbNo',
      };
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestCompleted<
        TokenPayload,
        any
      >(payload);

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.ADMIN);
    });

    it('returns none privilege level when no token has been loaded', () => {
      const tokens: AsyncRequest<TokenPayload, any> = AsyncRequestNotStarted();

      expect(getPrivilegeLevel(tokens)).toEqual(PrivilegeLevel.NONE);
    });
  });
});
