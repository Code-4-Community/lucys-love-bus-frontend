import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { MyEventsActions } from './actions';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import {EventDetails} from '../../upcoming-events/ducks/types';

export interface MyEventsReducerState {
    readonly myEvents: AsyncRequest<MyEventDetails[], any>;
}

export type MyEventsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  MyEventsActions
>;

export interface MyEventDetails extends EventDetails {
    numTickets: number;
}
