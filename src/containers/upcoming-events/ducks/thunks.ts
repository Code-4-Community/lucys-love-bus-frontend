import { getPrivilegeLevel } from '../../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../../auth/ducks/types';
import { upcomingEvents } from './actions';
import { EventInformation, EventsThunkAction } from './types';

export const getUpcomingEvents = (): EventsThunkAction<void> => {
  return (dispatch, getState, { publicApiClient, protectedApiClient }) => {
    const eventsFetcher: () => Promise<EventInformation[]> =
      getPrivilegeLevel(getState().authenticationState.tokens) ===
      PrivilegeLevel.NONE
        ? publicApiClient.getUpcomingEvents
        : protectedApiClient.getProtectedEvents;

    dispatch(upcomingEvents.loading());
    return eventsFetcher()
      .then((response: EventInformation[]) => {
        dispatch(upcomingEvents.loaded(response));
      })
      .catch((error: any) => {
        dispatch(upcomingEvents.failed(error));
      });
  };
};
