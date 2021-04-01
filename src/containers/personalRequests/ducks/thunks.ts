import { PersonalRequestsThunkAction } from './types';
import { personalRequests } from './actions';

export const getRequestStatuses = (): PersonalRequestsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(personalRequests.loading());
    return protectedApiClient
      .getRequestStatuses()
      .then((response: any) => {
        dispatch(personalRequests.loaded(response.requests));
      })
      .catch((error: any) => {
        dispatch(personalRequests.failed(error));
      });
  };
};
