import { Announcement, AnnouncementsReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { announcements } from './actions';
import { C4CAction } from '../../../store';

export const initialAnnouncementsState: AnnouncementsReducerState = {
  announcements: AsyncRequestNotStarted<Announcement[], any>(),
};

const announcementsReducer = generateAsyncRequestReducer<
  AnnouncementsReducerState,
  Announcement[],
  void
>(announcements.key);

const reducers = (
  state: AnnouncementsReducerState = initialAnnouncementsState,
  action: C4CAction,
): AnnouncementsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        announcements: announcementsReducer(state.announcements, action),
      };
    default:
      return state;
  }
};

export default reducers;
