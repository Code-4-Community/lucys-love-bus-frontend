import { genericAsyncActions } from '../../../utils/asyncRequest';
import { EventProps } from './types';

export const familyDetails = genericAsyncActions<EventProps[], any>();

export type EventsActions =
  | ReturnType<typeof familyDetails.loading>
  | ReturnType<typeof familyDetails.loaded>
  | ReturnType<typeof familyDetails.failed>;
