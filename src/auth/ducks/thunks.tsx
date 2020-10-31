import { AuthenticationState, LoginRequest } from './types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { authenticateUser } from './actions';
import AuthClient from '../authClient';

export const login = (
  loginRequest: LoginRequest,
): ThunkAction<void, AuthenticationState, unknown, Action<string>> => async (
  dispatch,
) => {
  const response = await AuthClient.login(loginRequest);
  dispatch(authenticateUser(response));
};
