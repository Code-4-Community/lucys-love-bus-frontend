import { EventInformation, EventsThunkAction } from './types';
import { upcomingEvents } from './actions';

export const getUpcomingEvents = (): EventsThunkAction<void> => {
  return (dispatch, getState, { publicApiClient }) => {
    dispatch(upcomingEvents.loading());
    return publicApiClient
      .getUpcomingEvents()
      .then((response: EventInformation[]) => {
        dispatch(upcomingEvents.loaded(response));
      })
      .catch((error: any) => {
        dispatch(upcomingEvents.failed(error));
      });
  };
};
