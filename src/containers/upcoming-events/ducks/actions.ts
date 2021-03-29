import { genericAsyncActions } from '../../../utils/asyncRequest';
import { EventInformation } from './types';

export const upcomingEvents = genericAsyncActions<EventInformation[], any>();

export type EventsActions =
  | ReturnType<typeof upcomingEvents.loading>
  | ReturnType<typeof upcomingEvents.loaded>
  | ReturnType<typeof upcomingEvents.failed>;
