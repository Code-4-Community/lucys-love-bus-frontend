import { Registration, EventRegistrationsThunkAction } from './types';
import { eventRegistrations } from './actions';

export const getEventRegistrations = (eventId:number): EventRegistrationsThunkAction<void> => {
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
