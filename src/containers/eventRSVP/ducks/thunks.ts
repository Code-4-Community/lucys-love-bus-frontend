import { eventRegistrations } from './actions';
import { EventRegistrationsThunkAction, Registration } from './types';

export const getEventRegistrations = (
  eventId: number,
): EventRegistrationsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(eventRegistrations.loading());
    return protectedApiClient
      .getEventRegistrations(eventId)
      .then((response: Registration[]) => {
        dispatch(eventRegistrations.loaded(response));
      })
      .catch((error: any) => {
        dispatch(eventRegistrations.failed(error));
      });
  };
};
