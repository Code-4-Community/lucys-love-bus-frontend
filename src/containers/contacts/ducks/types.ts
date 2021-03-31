import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { EventsActions } from './actions';
import { PublicApiExtraArgs } from '../../../api/publicApiClient';

export interface ContactsReducerState {
  readonly contacts: AsyncRequest<ContactInfo, any>;
}

export type EventsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  PublicApiExtraArgs,
  EventsActions
>;

export interface ContactInfo {
  id: number;
  title: string;
  spotsAvailable: number;
  capacity: number;
  thumbnail?: string;
  details: {
    description: string;
    location: string;
    start: Date;
    end: Date;
  };
  price: number;
}
