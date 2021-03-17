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
import { encodeProfileFieldFile } from '../../utils/fileEncoding';

const SignupFlow: React.FC = () => {
  const [GMForm, setGMForm] = useState<any | null>(null);
  const [PFForm1, setPFForm1] = useState<any | null>(null);
  const [PFForm2, setPFForm2] = useState<any | null>(null);
  const dispatch = useDispatch();

  function convertToYearMonthDateString(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  const submitGMForm = async (photoRelease: boolean) => {
    const profilePicture = await encodeProfileFieldFile(GMForm.profilePicture);
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
          photoRelease,
        },
        // {
        //   mainContact: {
        //     email: GMForm.email,
        //     firstName: GMForm.firstName,
        //     lastName: GMForm.lastName,
        //     dateOfBirth: convertToYearMonthDateString(GMForm.birthday),
        //     phoneNumber: GMForm.phoneNumber,
        //     pronouns: GMForm.pronouns,
        //     allergies: GMForm.allergies ?? null,
        //     diagnosis: GMForm.diagnosis ?? null,
        //     medications: GMForm.medication ?? null,
        //     notes: GMForm.otherNotes ?? null,
        //     referrer: GMForm.referrer === 'none' ? null : GMForm.referrer,
        //     profilePicture,
        //   },
        //   additionalContacts: [],
        //   children: [],
        // },
      ),
    );
  };

  const submitPFForm = async (photoRelease: boolean) => {
    dispatch(
      signup(
        {
          email: PFForm1.email,
          password: PFForm1.password,
          firstName: PFForm1.firstName,
          lastName: PFForm1.lastName,
          phoneNumber: PFForm1.phoneNumber,
          location: {
            address: PFForm1.address,
            city: PFForm1.city,
            state: PFForm1.state,
            zipCode: PFForm1.zip,
          },
          photoRelease,
        },
        // {
        //   mainContact: {
        //     firstName: PFForm1.firstName,
        //     lastName: PFForm1.lastName,
        //     dateOfBirth: convertToYearMonthDateString(PFForm1.birthday),
        //     phoneNumber: PFForm1.phoneNumber,
        //     pronouns: PFForm1.pronouns,
        //     allergies: PFForm1.allergies ?? null,
        //     diagnosis: PFForm1.diagnosis ?? null,
        //     medications: PFForm1.medication ?? null,
        //     notes: PFForm1.otherNotes ?? null,
        //     profilePicture: await encodeProfileFieldFile(
        //       PFForm1.profilePicture,
        //     ),
        //     email: PFForm1.email,
        //     referrer: PFForm1.referrer,
        //   },
        //   additionalContacts: PFForm2.contacts
        //     ? await Promise.all(
        //         PFForm2.contacts.map(async (contact: any) => ({
        //           firstName: contact.firstName,
        //           lastName: contact.lastName,
        //           dateOfBirth: convertToYearMonthDateString(contact.birthday),
        //           phoneNumber: contact.phoneNumber,
        //           pronouns: contact.pronouns,
        //           allergies: contact.allergies ?? null,
        //           diagnosis: contact.diagnosis ?? null,
        //           medications: contact.medication ?? null,
        //           notes: contact.otherNotes ?? null,
        //           email: contact.email,
        //           shouldSendEmails: true,
        //           profilePicture: await encodeProfileFieldFile(
        //             contact.profilePicture,
        //           ),
        //         })),
        //       )
        //     : [],
        //   children: PFForm2.children
        //     ? await Promise.all(
        //         PFForm2.children.map(async (child: any) => ({
        //           firstName: child.firstName,
        //           lastName: child.lastName,
        //           dateOfBirth: convertToYearMonthDateString(child.birthday),
        //           phoneNumber: child.phoneNumber,
        //           pronouns: child.pronouns,
        //           allergies: child.allergies ?? null,
        //           diagnosis: child.diagnosis ?? null,
        //           medications: child.medication ?? null,
        //           notes: child.otherNotes ?? null,
        //           school: child.school,
        //           schoolYear: child.grade,
        //           profilePicture: await encodeProfileFieldFile(
        //             child.profilePicture,
        //           ),
        //         })),
        //       )
        //     : [],
        // },
      ),
    );
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
