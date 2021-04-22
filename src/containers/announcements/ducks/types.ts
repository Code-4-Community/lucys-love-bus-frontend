import { ThunkAction } from 'redux-thunk';
import { PublicApiExtraArgs } from '../../../api/publicApiClient';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { AnnouncementsActions } from './actions';

export interface AnnouncementsReducerState {
  readonly announcements: AsyncRequest<Announcement[], any>;
}

export type AnnouncementsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  PublicApiExtraArgs,
  AnnouncementsActions
>;

export interface Announcement {
  id: number;
  imageSrc?: string;
  title: string;
  created: Date;
  description: string;
}
