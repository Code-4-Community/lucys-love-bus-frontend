import { genericAsyncActions } from '../../../utils/asyncRequest';
import { MyEventInformation } from './types';

export const myEvents = genericAsyncActions<MyEventInformation[], any>();

export type MyEventsActions =
  | ReturnType<typeof myEvents.loading>
  | ReturnType<typeof myEvents.loaded>
  | ReturnType<typeof myEvents.failed>;
