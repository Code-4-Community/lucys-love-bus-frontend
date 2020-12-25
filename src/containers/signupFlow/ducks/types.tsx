export enum SignupState {
  SignupDirectory,
  GeneralMemberFormOne,
  GeneralMemberVerification,
  GeneralMemberConfirmation,
}

export interface SignupFlowComponentProps {
  setSignupState: React.Dispatch<React.SetStateAction<SignupState>>;
}
