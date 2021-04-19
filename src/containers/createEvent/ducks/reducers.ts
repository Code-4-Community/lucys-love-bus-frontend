import { NewEventInformation, CreateEventReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { create } from './actions';
import { C4CAction } from '../../../store';

export const initialCreateEventState: CreateEventReducerState = {
  newEvent: AsyncRequestNotStarted<NewEventInformation, any>(),
};

const createEventReducer = generateAsyncRequestReducer<
  CreateEventReducerState,
  NewEventInformation,
  void
>(create.key);

const reducers = (
  state: CreateEventReducerState = initialCreateEventState,
  action: C4CAction,
): CreateEventReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        newEvent: createEventReducer(state.newEvent, action),
      };
    default:
      return state;
  }
};

export default reducers;
