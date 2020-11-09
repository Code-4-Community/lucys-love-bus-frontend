import { authenticateUser, UserAuthResponse } from '../ducks/actions';
import reducers, { initialUserState } from '../ducks/reducers';
import { PrivilegeLevel } from '../ducks/types';
import { AsyncRequestCompleted } from '../../utils/asyncRequest';

describe('User Authentication Reducers', () => {
  it('Updates state correctly when a user authenticates successfully', () => {
    const payload: UserAuthResponse = {
      userId: Math.floor(Math.random()),
      privilegeLevel: PrivilegeLevel.STANDARD,
    };
    const action = authenticateUser.loaded(payload);
    const expectedNextState = {
      ...initialUserState,
      userAuthenticationDetails: AsyncRequestCompleted<UserAuthResponse, void>(
        payload,
      ),
    };

    expect(reducers(initialUserState, action)).toEqual(expectedNextState);
  });
});
