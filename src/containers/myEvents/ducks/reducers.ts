
import { MyEventDetails, MyEventsReducerState} from './types';

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
    myEvents: AsyncRequestNotStarted<MyEventDetails[], any>(),
};

const myEventsReducer = generateAsyncRequestReducer<
    MyEventsReducerState,
    MyEventDetails[],
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
