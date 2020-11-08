import {
  AUTHENTICATION_SUCCESS_ACTION,
  AuthenticationSuccess,
  UserAuthResponse,
} from '../ducks/actions';
import reducers, { initialUserState } from '../ducks/reducers';
import { PrivilegeLevel } from '../ducks/types';

describe('User Authentication Reducers', () => {
  it('Updates state correctly when a user authenticates successfully', () => {
    const payload: UserAuthResponse = {
      userId: Math.floor(Math.random()),
      privilegeLevel: PrivilegeLevel.STANDARD,
    };
    const action: AuthenticationSuccess = {
      type: AUTHENTICATION_SUCCESS_ACTION,
      payload,
    };
    const expectedNextState = {
      ...initialUserState,
      ...payload,
    };

    expect(reducers(initialUserState, action)).toEqual(expectedNextState);
  });
});
