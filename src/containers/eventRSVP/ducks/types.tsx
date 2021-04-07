import { ThunkAction } from 'redux-thunk';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { PrivilegeLevel } from '../../../auth/ducks/types';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { EventRegistrationsActions } from './actions';

export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
  privilegeLevel: PrivilegeLevel;
  phoneNumber: string;
  profilePicture: string | null;
  photoRelease: boolean;
}

export type EventRegistrationsReducerState = {
  eventRegistrations: AsyncRequest<Registration[], any>;
};

export type EventRegistrationsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  EventRegistrationsActions
>;
