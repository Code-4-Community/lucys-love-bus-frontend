import { AnnouncementProps, AnnouncementsThunkAction } from './types';
import { announcements } from './actions';

export const getAnnouncements = (
  limit?: number,
): AnnouncementsThunkAction<void> => {
  return (dispatch, getState, { publicApiClient }) => {
    dispatch(announcements.loading());
    return publicApiClient
      .getAnnouncements()
      .then((response: AnnouncementProps[]) => {
        return limit && limit >= 0 ? response.slice(0, limit) : response;
      })
      .then((response: AnnouncementProps[]) => {
        dispatch(announcements.loaded(response));
      })
      .catch((error: any) => {
        dispatch(announcements.failed(error));
      });
  };
};
