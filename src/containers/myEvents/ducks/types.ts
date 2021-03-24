import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { MyEventsActions } from './actions';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';

export interface MyEventsReducerState {
  readonly myEvents: AsyncRequest<MyEventProps[], any>;
}

export type MyEventsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  MyEventsActions
>;

export interface MyEventProps {
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
