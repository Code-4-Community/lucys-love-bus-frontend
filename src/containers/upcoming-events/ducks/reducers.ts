import { EventDetails, EventsReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { upcomingEvents } from './actions';
import { C4CAction } from '../../../store';

export const initialEventsState: EventsReducerState = {
  upcomingEvents: AsyncRequestNotStarted<EventDetails[], any>(),
};

const upcomingEventsReducer = generateAsyncRequestReducer<
  EventsReducerState,
  EventDetails[],
  void
>(upcomingEvents.key);

const reducers = (
  state: EventsReducerState = initialEventsState,
  action: C4CAction,
): EventsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        upcomingEvents: upcomingEventsReducer(state.upcomingEvents, action),
      };
    default:
      return state;
  }
};

export default reducers;
