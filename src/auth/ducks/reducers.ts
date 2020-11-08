import { NO_USER_ID, PrivilegeLevel, UserState } from './types';
import { AUTHENTICATION_SUCCESS_ACTION } from './actions';
import { C4CAction } from '../../store';

export const initialUserState: UserState = {
  privilegeLevel: PrivilegeLevel.NONE,
  userId: NO_USER_ID,
};

const reducers = (
  state: UserState = initialUserState,
  action: C4CAction,
): UserState => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS_ACTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
