import { C4CAction } from '../../store';
import {
  AsyncRequestNotStarted, ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,

  ASYNC_REQUEST_NOT_STARTED_ACTION,

  generateAsyncRequestReducer
} from '../../utils/asyncRequest';
import { authenticateUser } from './actions';
import { TokenPayload, UserAuthenticationReducerState } from './types';

export const initialUserState: UserAuthenticationReducerState = {
  tokens: AsyncRequestNotStarted<TokenPayload, any>(),
};

const userAuthenticationRequestReducer = generateAsyncRequestReducer<
  UserAuthenticationReducerState,
  TokenPayload,
  void
>(authenticateUser.key);

const reducers = (
  state: UserAuthenticationReducerState = initialUserState,
  action: C4CAction,
): UserAuthenticationReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_NOT_STARTED_ACTION:
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        tokens: userAuthenticationRequestReducer(state.tokens, action),
      };
    default:
      return state;
  }
};

export default reducers;
