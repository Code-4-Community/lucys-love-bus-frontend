import { genericAsyncActions } from '../../../utils/asyncRequest';
import { EventInformation } from '../../upcoming-events/ducks/types';

export const myEvents = genericAsyncActions<EventInformation[], any>();

export type MyEventsActions =
  | ReturnType<typeof myEvents.loading>
  | ReturnType<typeof myEvents.loaded>
  | ReturnType<typeof myEvents.failed>;
