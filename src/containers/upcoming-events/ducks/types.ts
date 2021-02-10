import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { EventsActions } from './actions';
import { ApiExtraArgs } from '../../../api/protectedApiClient';

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
  title: string;
  date: Date;
  time: string;
  description: string;
  otherNotes?: string;
  thumbnail?: string;
  location?: string;
}
