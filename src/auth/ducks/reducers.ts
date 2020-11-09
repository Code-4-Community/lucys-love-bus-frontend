import { UserAuthenticationReducerState } from './types';
import { authenticateUser, UserAuthResponse } from './actions';
import { C4CAction } from '../../store';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../utils/asyncRequest';

export const initialUserState: UserAuthenticationReducerState = {
  userAuthenticationDetails: AsyncRequestNotStarted<UserAuthResponse, void>(),
};

const userAuthenticationRequestReducer = generateAsyncRequestReducer<
  UserAuthenticationReducerState,
  UserAuthResponse,
  void
>(authenticateUser.key);

const reducers = (
  state: UserAuthenticationReducerState = initialUserState,
  action: C4CAction,
): UserAuthenticationReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        userAuthenticationDetails: userAuthenticationRequestReducer(
          state.userAuthenticationDetails,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
