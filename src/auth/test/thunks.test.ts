import { PrivilegeLevel, TokenResponse } from '../ducks/types';
import { login, signup } from '../ducks/thunks';
import { authenticateUser, UserAuthResponse } from '../ducks/actions';
import authClient from '../authClient';
import { C4CState, initialStoreState, ThunkExtraArgs } from '../../store';
import tokenService from '../token';

export const generateState = (partialState: Partial<C4CState>): C4CState => ({
  ...initialStoreState,
  ...partialState,
});

describe('User Authentication Thunks', () => {
  describe('login', () => {
    it('dispatches an AuthSuccess action after login', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      const mockSetAccessToken = jest.fn();
      const mockSetRefreshToken = jest.fn();
      const mockGetUserID = jest.fn();
      const mockGetPrivilegeLevel = jest.fn();
      const mockTokenResponse: TokenResponse = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      const mockPayload: UserAuthResponse = {
        userId: Math.floor(Math.random()),
        privilegeLevel: PrivilegeLevel.STANDARD,
      };
      mockLogin.mockResolvedValue(mockTokenResponse);
      mockGetUserID.mockReturnValue(mockPayload.userId);
      mockGetPrivilegeLevel.mockReturnValue(mockPayload.privilegeLevel);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          login: mockLogin,
        },
        tokenService: {
          ...tokenService,
          setAccessToken: mockSetAccessToken,
          setRefreshToken: mockSetRefreshToken,
          getUserID: mockGetUserID,
          getPrivilegeLevel: mockGetPrivilegeLevel,
        },
      };

      await login({
        username: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.loaded(mockPayload),
      );
      expect(mockLogin).toBeCalledTimes(1);
      expect(mockSetAccessToken).toHaveBeenNthCalledWith(
        1,
        mockTokenResponse.accessToken,
      );
      expect(mockSetRefreshToken).toHaveBeenNthCalledWith(
        1,
        mockTokenResponse.refreshToken,
      );
    });

    it('dispatches an AuthSuccess action after signup', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      const mockSetAccessToken = jest.fn();
      const mockSetRefreshToken = jest.fn();
      const mockGetUserID = jest.fn();
      const mockGetPrivilegeLevel = jest.fn();
      const mockTokenResponse: TokenResponse = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      const mockPayload: UserAuthResponse = {
        userId: Math.floor(Math.random()),
        privilegeLevel: PrivilegeLevel.STANDARD,
      };
      mockSignup.mockResolvedValue(mockTokenResponse);
      mockGetUserID.mockReturnValue(mockPayload.userId);
      mockGetPrivilegeLevel.mockReturnValue(mockPayload.privilegeLevel);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
        tokenService: {
          ...tokenService,
          setAccessToken: mockSetAccessToken,
          setRefreshToken: mockSetRefreshToken,
          getUserID: mockGetUserID,
          getPrivilegeLevel: mockGetPrivilegeLevel,
        },
      };

      await signup({
        username: 'jblanc222',
        password: 'password',
        fullName: 'Jack Blanc',
        email: 'jblanc222@gmail.com',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.loaded(mockPayload),
      );
      expect(mockSignup).toBeCalledTimes(1);
      expect(mockSetAccessToken).toHaveBeenNthCalledWith(
        1,
        mockTokenResponse.accessToken,
      );
      expect(mockSetRefreshToken).toHaveBeenNthCalledWith(
        1,
        mockTokenResponse.refreshToken,
      );
    });
  });
});
