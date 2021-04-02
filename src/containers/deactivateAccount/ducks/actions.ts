import { genericAsyncActions } from '../../../utils/asyncRequest';

export const deactivateAccount = genericAsyncActions<void, any>();

export type DeactivateAccountActions =
  | ReturnType<typeof deactivateAccount.loading>
  | ReturnType<typeof deactivateAccount.loaded>
  | ReturnType<typeof deactivateAccount.failed>;
