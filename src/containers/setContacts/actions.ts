import { genericAsyncActions } from '../../utils/asyncRequest';

export const setContacts = genericAsyncActions<void, void>();

export type SetContactsActions =
    | ReturnType<typeof setContacts.loading>
    | ReturnType<typeof setContacts.loaded>
    | ReturnType<typeof setContacts.failed>;
