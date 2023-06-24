import { RefreshTokenResponse } from '../ducks/types';
import { login, refresh, signup } from '../ducks/thunks';
import { authenticateUser } from '../ducks/actions';
import authClient from '../authClient';
import { C4CState, initialStoreState, ThunkExtraArgs } from '../../store';
import protectedApiClient from '../../api/protectedApiClient';
import publicApiClient from '../../api/publicApiClient';
import { invalidExp, mockTokenResponse } from '../../App.test';

export const generateState = (partialState: Partial<C4CState>): C4CState => ({
  ...initialStoreState,
  ...partialState,
});

describe('User Authentication Thunks', () => {
  describe('login', () => {
    it('dispatches an authenticateUser.loaded() action after login', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      const mockOnError = jest.fn();
      mockLogin.mockResolvedValue(mockTokenResponse(invalidExp));

      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          login: mockLogin,
        },
        protectedApiClient,
        publicApiClient,
      };

      await login(
        {
          email: 'Jack Blanc',
          password: 'password',
        },
        mockOnError,
      )(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.loaded(mockTokenResponse(invalidExp)),
      );
      expect(mockLogin).toBeCalledTimes(1);
      expect(mockOnError).toBeCalledTimes(0);
    });

    it('dispatches authenticateUser.failed() action and calls onError when API fails', async () => {
      const mockLogin = jest.fn();
      const mockOnError = jest.fn();
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Unauthenticated user',
        },
      };
      mockLogin.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          login: mockLogin,
        },
        protectedApiClient,
        publicApiClient,
      };

      await login(
        {
          email: 'Jack Blanc',
          password: 'password',
        },
        mockOnError,
      )(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockLogin).toBeCalledTimes(1);
      expect(mockOnError).toBeCalledTimes(1);
    });
  });

  describe('refresh', () => {
    const mockRefreshToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY';

    it('dispatches an authenticateUser.loaded() action after refresh', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockRefresh = jest.fn();
      const mockRefreshTokenResponse: RefreshTokenResponse = {
        freshAccessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
      };
      mockRefresh.mockResolvedValue(mockRefreshTokenResponse);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          refresh: mockRefresh,
        },
        protectedApiClient,
        publicApiClient,
      };

      await refresh(mockRefreshToken)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.loaded({
          accessToken: mockRefreshTokenResponse.freshAccessToken,
          refreshToken: mockRefreshToken,
        }),
      );
      expect(mockRefresh).toBeCalledTimes(1);
    });

    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockRefresh = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Invalid token',
        },
      };
      mockRefresh.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          refresh: mockRefresh,
        },
        protectedApiClient,
        publicApiClient,
      };

      await refresh(mockRefreshToken)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockRefresh).toBeCalledTimes(1);
    });
  });

  describe('signup', () => {
    it('dispatches an authenticateUser.loaded() action after signup', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      mockSignup.mockResolvedValue(mockTokenResponse(invalidExp));
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
        protectedApiClient,
        publicApiClient,
      };
      const mockOnError = jest.fn();

      await signup(
        {
          password: 'password',
          firstName: 'Jack',
          lastName: 'Blanc',
          email: 'jack@jackblanc.com',
          photoRelease: true,
          phoneNumber: '',
          location: {
            address: '',
            city: '',
            state: '',
            zipCode: '',
          },
          dateOfBirth: '2001-01-15',
        },
        mockOnError,
      )(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.loaded(mockTokenResponse(invalidExp)),
      );
      expect(mockSignup).toBeCalledTimes(1);
      expect(mockOnError).toBeCalledTimes(0);
    });

    it('dispatches authenticateUser.failed() action and calls onError when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Unauthenticated user',
        },
      };
      const mockOnError = jest.fn();

      mockSignup.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
        protectedApiClient,
        publicApiClient,
      };

      await signup(
        {
          email: 'jblanc222@gmail.com',
          password: 'password',
          firstName: 'Jack',
          lastName: 'Blanc',
          photoRelease: true,
          phoneNumber: '',
          location: {
            address: '',
            city: '',
            state: '',
            zipCode: '',
          },
          dateOfBirth: '2001-01-15',
        },
        mockOnError,
      )(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockSignup).toBeCalledTimes(1);
      expect(mockOnError).toBeCalledTimes(1);
    });
  });
});
