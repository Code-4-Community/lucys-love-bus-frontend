import { C4CAction } from '../../../store';
import {
  AsyncRequestNotStarted,
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,

  generateAsyncRequestReducer
} from '../../../utils/asyncRequest';
import { eventRegistrations } from './actions';
import { EventRegistrationsReducerState, Registration } from './types';

export const initialEventRegistrationsState: EventRegistrationsReducerState = {
  eventRegistrations:  AsyncRequestNotStarted<Registration[], any>(),
}

const eventRegistrationsReducer = generateAsyncRequestReducer<
  EventRegistrationsReducerState,
  Registration[],
  void
>(eventRegistrations.key);

const reducers = (
  state: EventRegistrationsReducerState = initialEventRegistrationsState,
  action: C4CAction,
): EventRegistrationsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        eventRegistrations: eventRegistrationsReducer(state.eventRegistrations, action),
      };
    default:
      return state;
  }
};

export default reducers;
