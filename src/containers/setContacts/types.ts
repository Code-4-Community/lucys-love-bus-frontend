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