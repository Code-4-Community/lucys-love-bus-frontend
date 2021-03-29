import { MyEventInformation, MyEventsReducerState} from './types';

import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { myEvents } from './actions';
import { C4CAction } from '../../../store';

export const initialMyEventsState: MyEventsReducerState = {
    myEvents: AsyncRequestNotStarted<MyEventInformation[], any>(),
};

const myEventsReducer = generateAsyncRequestReducer<
    MyEventsReducerState,
    MyEventInformation[],
    void
    >(myEvents.key);

const reducers = (
  state: MyEventsReducerState = initialMyEventsState,
  action: C4CAction,
): MyEventsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        myEvents: myEventsReducer(state.myEvents, action),
      };
    default:
      return state;
  }
};

export default reducers;
