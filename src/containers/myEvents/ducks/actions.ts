import { genericAsyncActions } from '../../../utils/asyncRequest';
import { MyEventProps } from './types';

export const myEvents = genericAsyncActions<MyEventProps[], any>();

export type MyEventsActions =
  | ReturnType<typeof myEvents.loading>
  | ReturnType<typeof myEvents.loaded>
  | ReturnType<typeof myEvents.failed>;
