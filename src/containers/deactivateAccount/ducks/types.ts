import { ThunkAction } from 'redux-thunk';
import { ApiExtraArgs } from '../../../api/apiExtraArgs';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { DeactivateAccountActions } from './actions';

export interface DeactivateAccountReducerState {
  readonly deactivateAccount: AsyncRequest<void, any>;
}

export type DeactivateAccountThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  DeactivateAccountActions
>;
