import { genericAsyncActions } from '../../../utils/asyncRequest';
import { PersonalRequest } from './types';

export const personalRequests = genericAsyncActions<PersonalRequest[], any>();

export type PersonalRequestsActions =
  | ReturnType<typeof personalRequests.loading>
  | ReturnType<typeof personalRequests.loaded>
  | ReturnType<typeof personalRequests.failed>;
