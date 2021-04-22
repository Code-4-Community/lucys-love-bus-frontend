import { EventControlReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { createEvent } from './actions';
import { C4CAction } from '../../../store';
import { EventInformation } from '../../upcoming-events/ducks/types';

export const initialEventControlState: EventControlReducerState = {
  event: AsyncRequestNotStarted<EventInformation, any>(),
};

const eventControlReducer = generateAsyncRequestReducer<
  EventControlReducerState,
  EventInformation,
  void
>(createEvent.key);

const reducers = (
  state: EventControlReducerState = initialEventControlState,
  action: C4CAction,
): EventControlReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        event: eventControlReducer(state.event, action),
      };
    default:
      return state;
  }
};

export default reducers;
