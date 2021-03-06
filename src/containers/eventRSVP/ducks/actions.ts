import { genericAsyncActions } from '../../../utils/asyncRequest';
import { Registration } from './types';

export const eventRegistrations = genericAsyncActions<Registration[], any>();

export type EventRegistrationsActions =
  | ReturnType<typeof eventRegistrations.loading>
  | ReturnType<typeof eventRegistrations.loaded>
  | ReturnType<typeof eventRegistrations.failed>;
