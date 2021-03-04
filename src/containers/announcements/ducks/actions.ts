import { genericAsyncActions } from '../../../utils/asyncRequest';
import { AnnouncementProps } from './types';

export const announcements = genericAsyncActions<AnnouncementProps[], any>();

export type AnnouncementsActions =
  | ReturnType<typeof announcements.loading>
  | ReturnType<typeof announcements.loaded>
  | ReturnType<typeof announcements.failed>;
