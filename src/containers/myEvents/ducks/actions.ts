import { genericAsyncActions } from '../../../utils/asyncRequest';
import { MyEventDetails } from './types';

export const myEvents = genericAsyncActions<MyEventDetails[], any>();

export type MyEventsActions =
  | ReturnType<typeof myEvents.loading>
  | ReturnType<typeof myEvents.loaded>
  | ReturnType<typeof myEvents.failed>;
