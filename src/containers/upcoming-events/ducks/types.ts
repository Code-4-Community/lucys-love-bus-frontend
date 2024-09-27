import { ThunkAction } from 'redux-thunk';
import { PublicApiExtraArgs } from '../../../api/publicApiClient';
import { C4CState, ThunkExtraArgs } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { EventsActions } from './actions';

export interface EventsReducerState {
  readonly upcomingEvents: AsyncRequest<EventInformation[], any>;
}

export type EventsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ThunkExtraArgs,
  EventsActions
>;

export interface EventInformation {
  id: number;
  title: string;
  spotsAvailable: number;
  capacity: number;
  thumbnail?: string;
  details: {
    description: string;
    privateDescription?: string;
    location: string;
    start: Date;
    end: Date;
  };
  price: number;
  ticketCount?: number;
}
