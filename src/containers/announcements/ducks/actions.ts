import { genericAsyncActions } from '../../../utils/asyncRequest';
import { Announcement } from './types';

export const announcements = genericAsyncActions<Announcement[], any>();

export type AnnouncementsActions =
    | ReturnType<typeof announcements.loading>
    | ReturnType<typeof announcements.loaded>
    | ReturnType<typeof announcements.failed>
