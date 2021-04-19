import { genericAsyncActions } from '../../../utils/asyncRequest';
import { NewEventInformation } from './types';

export const create = genericAsyncActions<NewEventInformation, any>();
export const edit = genericAsyncActions<NewEventInformation, any>();
export const deleteEvent = genericAsyncActions<number, any>();

export type CreateEventActions =
  | ReturnType<typeof create.loading>
  | ReturnType<typeof create.loaded>
  | ReturnType<typeof create.failed>
  | ReturnType<typeof edit.loading>
  | ReturnType<typeof edit.loaded>
  | ReturnType<typeof edit.failed>
  | ReturnType<typeof deleteEvent.loading>
  | ReturnType<typeof deleteEvent.failed>;

