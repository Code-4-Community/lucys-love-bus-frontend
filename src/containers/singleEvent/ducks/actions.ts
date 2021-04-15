import { genericAsyncActions } from '../../../utils/asyncRequest';
import { EventAnnouncement } from './types';

export const eventAnnouncements = genericAsyncActions<
  EventAnnouncement[],
  any
>();

export type EventAnnouncementsActions =
  | ReturnType<typeof eventAnnouncements.loading>
  | ReturnType<typeof eventAnnouncements.loaded>
  | ReturnType<typeof eventAnnouncements.failed>;
