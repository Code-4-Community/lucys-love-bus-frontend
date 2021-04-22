import { Moment } from 'moment';
import { ThunkAction } from 'redux-thunk';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { FileField } from '../../../utils/fileEncoding';
import { ContactsActions } from './actions';
import { PrivilegeLevel } from '../../../auth/ducks/types';

export interface ContactsReducerState {
  readonly contacts: AsyncRequest<ContactInfo, any>;
  readonly setContacts: AsyncRequest<void, any>;
}

export type ContactsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  ContactsActions
>;

interface AbstractContact<D, P> {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: D;
  pronouns?: string;
  allergies?: string;
  diagnosis?: string;
  medications?: string;
  notes?: string;
  photoRelease?: boolean;
  profilePicture?: P;
}

interface GenericContact<D, P> extends AbstractContact<D, P> {
  email: string;
  phoneNumber: string;
  referrer?: string;
}

interface GenericChild<D, P> extends AbstractContact<D, P> {
  school: string;
  schoolYear: string;
}

export interface ContactInfo {
  mainContact: Contact;
  additionalContacts: AdditionalContact[];
  children: Child[];
  location: Location;
  privilegeLevel: PrivilegeLevel;
}

export type Contact = GenericContact<Date, string>;

export type Child = GenericChild<Date, string>;

export interface AdditionalContact extends Contact {
  shouldSendEmails?: boolean;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

type MainContactFormFields = GenericContact<Moment, FileField> & Location;

export interface ContactFormFields extends MainContactFormFields {
  additionalContacts: AdditionalContactFormField[];
  children: ChildContactFormField[];
}

export interface AdditionalContactFormField
  extends GenericContact<Moment, FileField> {
  shouldSendEmails?: boolean;
}

export type ChildContactFormField = GenericChild<Moment, FileField>;
