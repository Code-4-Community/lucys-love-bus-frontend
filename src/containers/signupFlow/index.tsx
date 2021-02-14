import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import AppAxiosInstance from '../../auth/axios';
import { ContentContainer } from '../../components';
import GMSignupForm from '../../components/GMSignupForm';
import PF1SignupForm from '../../components/PF1SignupForm';
import PF2SignupForm from '../../components/PF2SignupForm';
import SignupConfirmation from '../../components/SignupConfirmationForm';
import SignupDirectory from '../../components/SignupDirectory';
import SignupVerification from '../../components/SignupVerification';

// this is ugly, lets fix this when we learn typescript
interface SignupRequest {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly location: {
    readonly address: string;
    readonly city: string;
    readonly state: string;
    readonly zipCode: string;
  };
  readonly profilePicture: object | null;
}

interface ContactInfoRequest {
  mainContact: PFContact;
  additionalContacts: AdultContact[];
  children: ChildContact[];
}

interface PFContact {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  pronouns: string;
  allergies: string | null;
  diagnosis: string | null;
  medication: string | null;
  notes: string | null;
  profilePicture: String | null;
}

interface AdultContact extends PFContact {
  email: string;
  shouldSendEmails: boolean;
}

interface ChildContact extends PFContact {
  school: string;
  schoolYear: string;
}

function initialSignup(body: SignupRequest) {
  console.log(body);
  AppAxiosInstance.post('/api/v1/user/signup/', body)
    .then((res) => {
      console.log('success!!!');
      console.log(res);
    })
    .catch((err) => {
      // display "Try Again"
      console.error(err);
    });
}
//todo rewrite this with async await
function addContactInfo(
  signupBody: SignupRequest,
  contactBody: ContactInfoRequest,
) {
  /*
  try {
    await AppAxiosInstance.post('/api/v1/user/signup/', signupBody)
    await AppAxiosInstance.post('/api/v1/user/contact_info/'
    console.log("success!!!")
  } catch (err) {
    console.error(err);
  }

  */

  AppAxiosInstance.post('/api/v1/user/signup/', signupBody)
    .then((_) => {
      console.log('got here2');

      AppAxiosInstance.post('/api/v1/user/contact_info/', contactBody)
        .then((res) => {
          console.log('success!!!');
          console.log(res);
        })
        .catch((err) => {
          // display "Try Again"
          console.error(err);
        });
    })
    .catch((err) => {
      // display "Try Again"
      console.error(err);
    });
}

function convertImage(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const SignupFlow: React.FC = () => {
  const [GMForm, setGMForm] = useState<any | null>(null);
  const [PFForm1, setPFForm1] = useState<any | null>(null);
  const [PFForm2, setPFForm2] = useState<any | null>(null);

  const submitGMForm = async (photoRelease: boolean) => {
    // temporary console logs, just to show data is being collected correctly.
    console.log(GMForm); // tslint:disable-line
    console.log(photoRelease); // tslint:disable-line

    const profilePicture = GMForm.profilePicture
      ? await convertImage(GMForm.profilePicture.file).catch((e) => null)
      : null;

    initialSignup({
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
      profilePicture: profilePicture,
    });
  };

  const submitPFForm = (photoRelease: boolean) => {
    // temporary console logs, just to show data is being collected correctly.
    console.log(PFForm1); // tslint:disable-line
    console.log(PFForm2); // tslint:disable-line
    console.log(photoRelease); // tslint:disable-line

    addContactInfo(
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
        profilePicture: null,
      },
      {
        mainContact: {
          firstName: PFForm1.firstName,
          lastName: PFForm1.lastName,
          dateOfBirth: new Date(), //todo add field for date of birth
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
      },
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
