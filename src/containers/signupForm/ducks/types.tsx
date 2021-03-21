import { ThunkAction } from 'redux-thunk';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { C4CState } from '../../../store';
import { SetContactsActions } from '../../setContacts/actions';

export enum SignupState {
  SignupDirectory,
  GeneralMemberFormOne,
  GeneralMemberVerification,
  GeneralMemberConfirmation,
}

export interface SignupFlowComponentProps {
  setSignupState: React.Dispatch<React.SetStateAction<SignupState>>;
}

export type SetContactsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  SetContactsActions
>;

export interface SetContactsRequest {
  mainContact: AdultContact;
  additionalContacts: AdditionalContact[];
  children: ChildContact[];
}

interface Contact {
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string; // YYYY-MM-DD
  readonly phoneNumber: string;
  readonly pronouns: string;
  readonly allergies: string | null;
  readonly diagnosis: string | null;
  readonly medications: string | null;
  readonly notes: string | null;
  readonly profilePicture: string | null;
  readonly referrer: string | null;
}

interface AdultContact extends Contact {
  readonly email: string;
}

interface AdditionalContact extends AdultContact {
  readonly shouldSendEmails: boolean;
}

interface ChildContact extends Contact {
  readonly school: string;
  readonly schoolYear: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  allergies?: string;
  diagnosis?: string;
  medications?: string;
  otherNotes?: string;
  password: string;
  profilePicture?: {
    file: File;
  };
  photoRelease: boolean;
  referrer: string;
  dateOfBirth: Date;
}
