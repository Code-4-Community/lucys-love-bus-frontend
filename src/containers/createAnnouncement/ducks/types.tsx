export interface SignupData {
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
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
