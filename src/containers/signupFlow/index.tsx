import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { signup } from '../../auth/ducks/thunks';
import { ContentContainer } from '../../components';
import GMSignupForm from '../../components/GMSignupForm';
import PF1SignupForm from '../../components/PF1SignupForm';
import PF2SignupForm from '../../components/PF2SignupForm';
import SignupConfirmation from '../../components/SignupConfirmationForm';
import SignupDirectory from '../../components/SignupDirectory';
import SignupVerification from '../../components/SignupVerification';
import convertToBase64String from '../../utils/convertToBase64String';

const SignupFlow: React.FC = () => {
  const [GMForm, setGMForm] = useState<any | null>(null);
  const [PFForm1, setPFForm1] = useState<any | null>(null);
  const [PFForm2, setPFForm2] = useState<any | null>(null);
  const dispatch = useDispatch();

  const submitGMForm = async (photoRelease: boolean) => {
    const profilePicture = GMForm.profilePicture
      ? await convertToBase64String(GMForm.profilePicture.file).catch(
          (e) => null,
        )
      : null;
    dispatch(
      signup(
        {
          email: GMForm.email,
          password: GMForm.password,
          firstName: GMForm.firstName,
          lastName: GMForm.lastName,
          phoneNumber: GMForm.phoneNumber,
          location: {
            address: GMForm.address,
            city: GMForm.city,
            state: GMForm.state,
            zipCode: GMForm.zip,
          },
          photoRelease: photoRelease,
          referrer: string,
        },
        {
          mainContact: {
            email: GMForm.email,
            firstName: GMForm.firstName,
            lastName: GMForm.lastName,
            dateOfBirth: GMForm.birthday.toISOString().split('T')[0],
            phoneNumber: GMForm.phoneNumber,
            pronouns: GMForm.pronouns,
            allergies: GMForm.allergies ?? null,
            diagnosis: GMForm.diagnosis ?? null,
            medications: GMForm.medication ?? null,
            notes: GMForm.otherNotes ?? null,
            profilePicture,
          },
          additionalContacts: [],
          children: [],
        },
      ),
    );
  };

  const submitPFForm = (photoRelease: boolean) => {
    // temporary console logs, just to show data is being collected correctly.
    console.log(PFForm1); // tslint:disable-line
    console.log(PFForm2); // tslint:disable-line
    console.log(photoRelease); // tslint:disable-line
    /*
    addContactInfo({
      mainContact: {
        firstName: PFForm1.firstName,
        lastName: PFForm1.lastName,
        dateOfBirth: new Date(), // todo add field for date of birth
        phoneNumber: PFForm1.phoneNumber,
        pronouns: PFForm1.pronouns,
        allergies: PFForm1.allergies ?? null,
        diagnosis: PFForm1.diagnosis ?? null,
        medication: PFForm1.medication ?? null,
        notes: PFForm1.notes ?? null,
        profilePicture: null,
      },
      additionalContacts: PFForm2.contacts.map((contact: any) => ({
        firstName: contact.firstName,
        lastName: contact.lastName,
        dateOfBirth: contact.birthday._d,
        phoneNumber: contact.phoneNumber,
        pronouns: contact.pronouns,
        allergies: contact.allergies ?? null,
        diagnosis: contact.diagnosis ?? null,
        medication: contact.medication ?? null,
        notes: contact.notes ?? null,
        email: contact.email,
        shouldSendEmails: true, // todo: add field
        profilePicture: null,
      })),
      children: PFForm2.children.map((child: any) => ({
        firstName: child.firstName,
        lastName: child.lastName,
        dateOfBirth: child.birthday._d,
        phoneNumber: child.phoneNumber,
        pronouns: child.pronouns,
        allergies: child.allergies ?? null,
        diagnosis: child.diagnosis ?? null,
        medication: child.medication ?? null,
        notes: child.notes ?? null,
        school: child.school,
        grade: child.grade,
        profilePicture: null,
      })),
    });*/
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta
          name="description"
          content="Sign up for Lucy's Love Bus Events."
        />
      </Helmet>
      <ContentContainer>
        <Route
          path="/signup"
          exact
          render={() => (
            <>
              <SignupDirectory />
            </>
          )}
        />
        <Route
          path="/signup/gm/1"
          exact
          render={() => <GMSignupForm setGMForm={setGMForm} />}
        />

        <Route
          path="/signup/gm/confirmation"
          exact
          render={() => (
            <SignupConfirmation
              groupTitle={'General Member'}
              backURL={'/signup/gm/1'}
              nextURL={'/signup/gm/verification/'}
              onSubmission={submitGMForm}
            />
          )}
        />
        <Route
          path="/signup/gm/verification"
          exact
          render={() => <SignupVerification groupTitle={'General Member'} />}
        />

        <Route
          path="/signup/pf/1"
          exact
          render={() => <PF1SignupForm setPMForm={setPFForm1} />}
        />
        <Route
          path="/signup/pf/2"
          exact
          render={() => <PF2SignupForm setPMForm={setPFForm2} />}
        />
        <Route
          path="/signup/pf/confirmation"
          exact
          render={() => (
            <SignupConfirmation
              groupTitle={'Participating Family'}
              backURL={'/signup/pf/2'}
              nextURL={'/signup/pf/verification/'}
              onSubmission={submitPFForm}
            />
          )}
        />
        <Route
          path="/signup/pf/verification"
          exact
          render={() => (
            <SignupVerification groupTitle={'Participating Family'} />
          )}
        />
      </ContentContainer>
    </>
  );
};

export default SignupFlow;
