import { EventAnnouncement, EventAnnouncementsReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { eventAnnouncements } from './actions';
import { C4CAction } from '../../../store';

export const initialEventAnnouncementsState: EventAnnouncementsReducerState = {
  eventAnnouncements: AsyncRequestNotStarted<EventAnnouncement[], any>(),
};

const eventAnnouncementsReducer = generateAsyncRequestReducer<
  EventAnnouncementsReducerState,
  EventAnnouncement[],
  void
>(eventAnnouncements.key);

const reducers = (
  state: EventAnnouncementsReducerState = initialEventAnnouncementsState,
  action: C4CAction,
): EventAnnouncementsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        eventAnnouncements: eventAnnouncementsReducer(
          state.eventAnnouncements,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;
