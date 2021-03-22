import {  DeactivateAccountReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { deactivateAccount } from './actions';
import { C4CAction } from '../../../store';

export const initialDeactivateAccountState: DeactivateAccountReducerState = {
  deactivateAccount: AsyncRequestNotStarted<void, any>(),
};

const deactivateAccountReducer = generateAsyncRequestReducer<
DeactivateAccountReducerState,
  void,
  void
>(deactivateAccount.key);

const reducers = (
  state: DeactivateAccountReducerState = initialDeactivateAccountState,
  action: C4CAction,
): DeactivateAccountReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        deactivateAccount: deactivateAccountReducer(state.deactivateAccount, action),
      };
    default:
      return state;
  }
};

export default reducers;
