import { EventProps, EventsThunkAction } from './types';
import { upcomingEvents } from './actions';

export const getUpcomingEvents = (): EventsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(upcomingEvents.loading());
    return protectedApiClient
      .getUpcomingEvents()
      .then((response: EventProps[]) => {
        dispatch(upcomingEvents.loaded(response));
      })
      .catch((error: any) => {
        dispatch(upcomingEvents.failed(error));
      });
  };
};
