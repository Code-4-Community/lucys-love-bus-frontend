import { genericAsyncActions } from '../../../utils/asyncRequest';
import { EventInformation } from '../../upcoming-events/ducks/types';

export const createEvent = genericAsyncActions<EventInformation, any>();
export const editEvent = genericAsyncActions<EventInformation, any>();
export const deleteEvent = genericAsyncActions<void, any>();

export type EventControlActions =
  | ReturnType<typeof createEvent.loading>
  | ReturnType<typeof createEvent.loaded>
  | ReturnType<typeof createEvent.failed>
  | ReturnType<typeof editEvent.loading>
  | ReturnType<typeof editEvent.loaded>
  | ReturnType<typeof editEvent.failed>
  | ReturnType<typeof deleteEvent.loading>
  | ReturnType<typeof deleteEvent.loaded>
  | ReturnType<typeof deleteEvent.failed>;
