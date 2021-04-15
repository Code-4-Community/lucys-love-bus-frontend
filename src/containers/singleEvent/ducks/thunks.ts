import { EventAnnouncement } from './types';
import { eventAnnouncements } from './actions';
import { EventAnnouncementsThunkAction } from '../../singleEvent/ducks/types';

export const getEventAnnouncements = (
  eventId: number,
): EventAnnouncementsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(eventAnnouncements.loading());
    return protectedApiClient
      .getEventAnnouncements(eventId)
      .then((response: EventAnnouncement[]) => {
        dispatch(eventAnnouncements.loaded(response));
      })
      .catch((error: any) => {
        dispatch(eventAnnouncements.failed(error));
      });
  };
};
