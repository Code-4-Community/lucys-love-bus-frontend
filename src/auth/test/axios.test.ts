import {
  accessToken,
  BASE_URL,
  invalidExp,
  mockExpiredToken,
  mockTokenResponse,
  validExp,
} from '../../App.test';
import { ProtectedApiClientRoutes } from '../../api/protectedApiClient';
import { AxiosError } from 'axios';
import authClient from '../authClient';
import { responseErrorInterceptor } from '../axios';
import store, { C4CState } from '../../store';
import { AsyncRequestCompleted } from '../../utils/asyncRequest';
import { generateState } from './thunks.test';
import nock from 'nock';

// a mock partial state with a valid refresh token
const mockValidAuthState: Partial<C4CState> = {
  authenticationState: {
    tokens: AsyncRequestCompleted(mockTokenResponse(validExp)),
  },
};

// a mock partial state with an invalid refresh token
const mockInvalidAuthState: Partial<C4CState> = {
  authenticationState: {
    tokens: AsyncRequestCompleted(mockTokenResponse(invalidExp)),
  },
};

// mock history for navigation on logout
jest.mock('../../history');

// prepare to mock authClient
jest.mock('../authClient');

describe('Axios Non-Refresh Tests', () => {
  describe('responseErrorInterceptor', () => {
    it('refreshes if the refresh token is not expired', async () => {
      // mock unauthorized, refreshable state
      store.getState = () => generateState(mockValidAuthState);

      // mock successful refresh
      const mockRefresh = jest.fn();
      authClient.refresh = mockRefresh;
      mockRefresh.mockResolvedValue({
        freshAccessToken: accessToken,
      });

      // nock a successful request
      const registerTicketsResponse = '';
      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.REGISTER_TICKETS)
        .reply(200, registerTicketsResponse);

      const result = await responseErrorInterceptor(mockExpiredToken);

      expect(mockRefresh).toHaveBeenCalledTimes(1);
      expect(result.data).toEqual(registerTicketsResponse);
    });

    it('logs out if refresh token is expired and propagates error', async () => {
      // mock unauthorized, un-refreshable state
      store.getState = () => generateState(mockInvalidAuthState);

      // mock logout and refresh
      const mockLogout = jest.fn();
      authClient.logout = mockLogout;
      mockLogout.mockResolvedValue({});
      authClient.refresh = jest.fn();

      responseErrorInterceptor(mockExpiredToken)
        .then(() => {
          fail('Did not propagate error');
        })
        .catch((err) => {
          expect(authClient.logout).toHaveBeenCalledTimes(1);
          expect(err).toEqual(mockExpiredToken);
        });
    });

    it('propagates error if not an expired token error and does not logout or refresh', async () => {
      // mock logout and refresh
      authClient.logout = jest.fn();
      authClient.refresh = jest.fn();

      // a bad request error (not 401)
      const mockBadRequest: AxiosError = {
        code: '',
        config: {
          url: ProtectedApiClientRoutes.ANNOUNCEMENTS,
          baseURL: BASE_URL,
        },
        isAxiosError: false,
        message: '',
        name: '',
        request: undefined,
        response: {
          status: 400,
          data: 'Bad request',
          statusText: '',
          config: {},
          headers: undefined,
        },
        toJSON: () => {
          return mockExpiredToken;
        },
      };

      responseErrorInterceptor(mockBadRequest)
        .then(() => {
          fail('Did not propagate error');
        })
        .catch((err) => {
          expect(authClient.logout).toHaveBeenCalledTimes(0);
          expect(authClient.refresh).toHaveBeenCalledTimes(0);
          expect(err).toEqual(mockBadRequest);
        });
    });
  });
});
