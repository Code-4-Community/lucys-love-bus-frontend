import { genericAsyncActions } from '../../../utils/asyncRequest';
import { EventProps } from './types';

export const upcomingEvents = genericAsyncActions<EventProps[], any>();

export type EventsActions =
  | ReturnType<typeof upcomingEvents.loading>
  | ReturnType<typeof upcomingEvents.loaded>
  | ReturnType<typeof upcomingEvents.failed>;
