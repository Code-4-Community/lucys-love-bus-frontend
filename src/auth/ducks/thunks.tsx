import { AuthenticationState, LoginRequest } from './types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { loginUser } from './actions';

export const login = (
  loginRequest: LoginRequest,
): ThunkAction<void, AuthenticationState, unknown, Action<string>> => async (
  dispatch,
) => {
  const response = await login(loginRequest);
  dispatch(loginUser(response));
};
