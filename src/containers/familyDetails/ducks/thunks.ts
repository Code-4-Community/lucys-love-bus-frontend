import { EventProps, EventsThunkAction } from './types';
import { familyDetails } from './actions';

export const getUpcomingEvents = (): EventsThunkAction<void> => {
  return (dispatch, getState, { publicApiClient }) => {
    dispatch(familyDetails.loading());
    return publicApiClient
      .getUpcomingEvents()
      .then((response: EventProps[]) => {
        dispatch(familyDetails.loaded(response));
      })
      .catch((error: any) => {
        dispatch(familyDetails.failed(error));
      });
  };
};
