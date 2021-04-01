import { ThunkAction } from 'redux-thunk';
import { PublicApiExtraArgs } from '../../../api/publicApiClient';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { EventsActions } from './actions';

export interface ContactsReducerState {
  readonly contacts: AsyncRequest<ContactInfo, any>;
}

export type EventsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  PublicApiExtraArgs,
  EventsActions
>;


export interface Contact {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  pronouns: string;
  allergies: string;
  diagnosis: string;
  medications: string;
  notes: string;
  photoRelease: boolean;
  referrer?: string;
  profilePicture: string;
  dateOfBirth: Date;
}


export interface Child {
  firstName: string;
  lastName: string;
  pronouns: string;
  allergies: string;
  diagnosis: string;
  medications?: string;
  notes: string;
  photoRelease: boolean;
  profilePicture: string;
  dateOfBirth: Date;
}

export interface AdditionalContact extends Contact {
  shouldSendEmails: boolean;
}

export interface ContactInfo {
  mainContact: Contact,
  additionalContacts: AdditionalContact[],

  
}
