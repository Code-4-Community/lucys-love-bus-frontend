import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { CreateEventActions } from './actions';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';

export interface CreateEventReducerState {
  readonly newEvent: AsyncRequest<NewEventInformation, any>;
}

export type CreateEventThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  CreateEventActions
>;

export interface NewEventInformation {
  title: string;
  capacity: number;
  thumbnail?: string;
  price: number;
  details: {
    description: string;
    location: string;
    start: Date;
    end: Date;
  };
}
