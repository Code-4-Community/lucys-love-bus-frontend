import { genericAsyncActions } from '../../../utils/asyncRequest';
import { ContactInfo } from './types';

export const upcomingEvents = genericAsyncActions<ContactInfo[], any>();

export type EventsActions =
  | ReturnType<typeof upcomingEvents.loading>
  | ReturnType<typeof upcomingEvents.loaded>
  | ReturnType<typeof upcomingEvents.failed>;
