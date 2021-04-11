import { genericAsyncActions } from '../../../utils/asyncRequest';
import { ContactInfo } from './types';

export const contacts = genericAsyncActions<ContactInfo, any>();
export const setContacts = genericAsyncActions<void, any>();

export type ContactsActions =
  | ReturnType<typeof contacts.notStarted>
  | ReturnType<typeof contacts.loading>
  | ReturnType<typeof contacts.loaded>
  | ReturnType<typeof contacts.failed>
  | ReturnType<typeof setContacts.notStarted>
  | ReturnType<typeof setContacts.loading>
  | ReturnType<typeof setContacts.loaded>
  | ReturnType<typeof setContacts.failed>;
