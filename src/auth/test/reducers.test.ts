import { authenticateUser } from '../ducks/actions';
import reducers, { initialUserState } from '../ducks/reducers';
import { TokenPayload, UserAuthenticationReducerState } from '../ducks/types';
import { AsyncRequestCompleted } from '../../utils/asyncRequest';
import { invalidExp, mockTokenResponse } from '../../App.test';

describe('User Authentication Reducers', () => {
  describe('Token Payload', () => {
    it('Updates state correctly when a user authenticates successfully', () => {
      const action = authenticateUser.loaded(mockTokenResponse(invalidExp));
      const expectedNextState: UserAuthenticationReducerState = {
        ...initialUserState,
        tokens: AsyncRequestCompleted<TokenPayload, void>(
          mockTokenResponse(invalidExp),
        ),
      };
      expect(reducers(initialUserState, action)).toEqual(expectedNextState);
    });
  });

  it('Clears tokens correctly when setting state to NotStarted', () => {
    const payload: TokenPayload = {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
      refreshToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
    };
    const action = authenticateUser.notStarted();
    const authenticatedState: UserAuthenticationReducerState = {
      ...initialUserState,
      tokens: AsyncRequestCompleted<TokenPayload, void>(payload),
    };

    expect(reducers(authenticatedState, action)).toEqual(initialUserState);
  });
});
