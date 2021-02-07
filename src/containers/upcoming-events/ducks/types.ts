import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { EventsActions } from './actions';
import { ApiExtraArgs } from '../../../api/publicApiClient';

export interface EventsReducerState {
  readonly upcomingEvents: AsyncRequest<EventProps[], any>;
}

export type EventsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  EventsActions
>;

export interface EventProps {
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
  }
  price: number;
}
