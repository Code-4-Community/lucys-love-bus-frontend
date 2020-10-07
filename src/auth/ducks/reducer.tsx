import { AuthenticationState } from './types';
import { Action } from 'redux';

export const initialState: AuthenticationState = {
  privilegeLevel: -1,
  userId: -1,
}

const reducers = (
  state: AuthenticationState = initialState,
  action: Action,
): AuthenticationState => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducers;