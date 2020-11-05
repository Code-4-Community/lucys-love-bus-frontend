import { UserState } from './types';
import { AUTHENTICATION_SUCCESS_ACTION } from './actions';
import { C4CAction } from '../../index';

export const initialUserState: UserState = {
  privilegeLevel: -1,
  userId: -1,
};

const reducers = (
  state: UserState = initialUserState,
  action: C4CAction,
): UserState => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS_ACTION:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default reducers;
