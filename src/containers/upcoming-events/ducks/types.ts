import { ThunkAction } from 'redux-thunk';
import { PublicApiExtraArgs } from '../../../api/publicApiClient';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { EventsActions } from './actions';

export interface EventsReducerState {
  readonly upcomingEvents: AsyncRequest<EventInformation[], any>;
}

export type EventsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  PublicApiExtraArgs,
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
    location: string;
    start: Date;
    end: Date;
  };
  forPFOnly?: boolean;
  price: number;
  ticketCount?: number;
}
