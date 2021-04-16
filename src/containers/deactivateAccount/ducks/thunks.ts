import { ThunkAction } from 'redux-thunk';
import { ApiExtraArgs } from '../../../api/apiExtraArgs';
import {
  authenticateUser,
  UserAuthenticationActions,
} from '../../../auth/ducks/actions';
import { C4CState, LOCALSTORAGE_STATE_KEY } from '../../../store';
import { deactivateAccount, DeactivateAccountActions } from './actions';

type UserAuthenticationAndDeactivateAccountThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  UserAuthenticationActions | DeactivateAccountActions
>;

export const requestToDeactivateAccount = (): UserAuthenticationAndDeactivateAccountThunkAction<void> => {
  return (dispatch, _getState, { protectedApiClient }) => {
    dispatch(deactivateAccount.loading());
    return protectedApiClient
      .deactivateAccount()
      .then(() => {
        dispatch(deactivateAccount.loaded());
        localStorage.removeItem(LOCALSTORAGE_STATE_KEY);
        dispatch(authenticateUser.notStarted());
      })
      .catch((error: any) => {
        dispatch(deactivateAccount.failed(error));
      });
  };
};
