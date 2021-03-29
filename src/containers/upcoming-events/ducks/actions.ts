import { genericAsyncActions } from '../../../utils/asyncRequest';
import { EventDetails } from './types';

export const upcomingEvents = genericAsyncActions<EventDetails[], any>();

export type EventsActions =
  | ReturnType<typeof upcomingEvents.loading>
  | ReturnType<typeof upcomingEvents.loaded>
  | ReturnType<typeof upcomingEvents.failed>;
