import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { EventControlActions } from './actions';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { EventInformation } from '../../upcoming-events/ducks/types';

export interface EventControlReducerState {
  readonly event: AsyncRequest<EventInformation, any>;
}

export type EventControlThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  EventControlActions
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
