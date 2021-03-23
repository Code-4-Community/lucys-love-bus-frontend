import { DeactivateAccountThunkAction } from './types';
import { deactivateAccount } from './actions';

import { LOCALSTORAGE_STATE_KEY } from '../../../store';

export const requestToDeactivateAccount = (): DeactivateAccountThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(deactivateAccount.loading());
    return protectedApiClient
      .decactivateAccount()
      .then(() => {
        dispatch(deactivateAccount.loaded());

        // want to force log out user:

        localStorage.removeItem(LOCALSTORAGE_STATE_KEY); // ???
        console.log(localStorage.getItem(LOCALSTORAGE_STATE_KEY))


      })
      .catch((error: any) => {
        dispatch(deactivateAccount.failed(error));
      });
  };
};
