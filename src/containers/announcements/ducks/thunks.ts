import { Announcement, AnnouncementsThunkAction } from './types';
import { announcements } from './actions';

export const getAnnouncements = (limit?: number): AnnouncementsThunkAction<void> => {
    return (dispatch, getState, { publicApiClient }) => {
        dispatch(announcements.loading());
        return publicApiClient
            .getAnnouncements()
            .then((response: Announcement[]) => {
                return (limit && limit >= 0) ? response.slice(0, limit) : response;
            })
            .then((response: Announcement[]) => {
                dispatch(announcements.loaded(response));
            })
            .catch((error: any) => {
                dispatch(announcements.failed(error));
            });
    };
};
