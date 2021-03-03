import axios, { AxiosError, AxiosInstance } from 'axios';
import store, { LOCALSTORAGE_STATE_KEY } from '../store';
import { asyncRequestIsComplete } from '../utils/asyncRequest';
import { UserAuthenticationReducerState } from './ducks/types';
import { isTokenValid } from './ducks/selectors';
import AuthClient from './authClient';

const AppAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const listener = () => {
//   const state: C4CState = store.getState();
//   if (state.authenticationState.tokens.kind === AsyncRequestKinds.Completed) {
//     AppAxiosInstance.defaults.headers['X-Access-Token'] =
//       state.authenticationState.tokens.result.accessToken;
//   }
// };
//
// // store.subscribe(listener);

// const responseErrorInterceptor: (error: AxiosError) => void = (error) => {
//   // const originalRequest = error.config;
//   if (
//     error.code === '401' &&
//     error.message === INVALID_ACCESS_TOKEN &&
//     tokenService.isRefreshTokenValid()
//   ) {
//     // return refresh().then(() => {
//     //   Instance.defaults.headers[
//     //     'X-Access-Token'
//     //   ] = tokenService.getAccessToken();
//     //   return Instance(originalRequest);
//     // });
//   }
//   if (
//     error.code === '401' &&
//     error.message === INVALID_ACCESS_TOKEN &&
//     !tokenService.isRefreshTokenValid()
//   ) {
//     // logout();
//   }
//   return Promise.reject(error);
// };

const INVALID_ACCESS_TOKEN: string = 'Given access token is expired or invalid';

const responseErrorInterceptor = (error: AxiosError) => {
  const originalRequest = {
    ...error.config,
    _retry: true,
  };

  const tokens: UserAuthenticationReducerState['tokens'] = store.getState()
    .authenticationState.tokens;

  if (
    asyncRequestIsComplete(tokens) &&
    error?.response?.status === 401 &&
    error?.response?.data === INVALID_ACCESS_TOKEN &&
    isTokenValid(tokens.result.refreshToken) &&
    !(error.config as any)?._retry
  ) {
    return AuthClient.refresh(tokens.result.refreshToken).then(
      ({ freshAccessToken }) => {
        AppAxiosInstance.defaults.headers['X-Access-Token'] = freshAccessToken;
        originalRequest.headers['X-Access-Token'] = freshAccessToken;
        return AppAxiosInstance(originalRequest);
      },
    );
  }
  if (
    asyncRequestIsComplete(tokens) &&
    error?.response?.status === 401 &&
    error?.response?.data === INVALID_ACCESS_TOKEN &&
    !isTokenValid(tokens.result.refreshToken)
  ) {
    AuthClient.logout(tokens.result.refreshToken).then(() => {
      localStorage.removeItem(LOCALSTORAGE_STATE_KEY);
    });
  }
  return Promise.reject(error);
};

AppAxiosInstance.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor,
);

export default AppAxiosInstance;
