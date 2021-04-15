import { ThunkAction } from 'redux-thunk';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { Announcement } from '../../announcements/ducks/types';
import { EventAnnouncementsActions } from './actions';

export interface EventAnnouncementsReducerState {
  readonly eventAnnouncements: AsyncRequest<EventAnnouncement[], any>;
}

export type EventAnnouncementsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  EventAnnouncementsActions
>;

export interface EventAnnouncement extends Announcement {
  eventId?: number;
}
