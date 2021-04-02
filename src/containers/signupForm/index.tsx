import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../App';
import { signup } from '../../auth/ducks/thunks';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import SignupForm from '../../components/SignupForm';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { convertToYearMonthDateString } from '../../utils/dateUtils';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';
import {
  participatingFamilySearchQuery,
  participatingFamilySearchQueryFlag,
} from '../../utils/signupFlow';
import { SignupData } from './ducks/types';
interface SignupFormContainerProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const SignupFormContainer: React.FC<SignupFormContainerProps> = ({
  tokens,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const registeringAsParticipatingFamily =
    new URLSearchParams(location.search).get(
      participatingFamilySearchQueryFlag,
    ) != null;

  if (asyncRequestIsComplete(tokens)) {
    if (registeringAsParticipatingFamily) {
      history.push({
        pathname: Routes.SET_CONTACTS,
        search: participatingFamilySearchQuery,
      });
    } else {
      history.push(Routes.SIGNUP_CONFIRMATION);
    }
  }

  const onFinish = async (data: SignupData) => {
    const profilePicture =
      data.profilePicture &&
      (await encodeProfileFieldFile(data.profilePicture));
    dispatch(
      signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        location: {
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zip,
        },
        photoRelease: data.photoRelease,
        referrer: data.referrer,
        profilePicture,
        allergies: data.allergies,
        medication: data.medications,
        notes: data.otherNotes,
        dateOfBirth: convertToYearMonthDateString(data.dateOfBirth),
        pronouns: data.pronouns,
        diagnosis: data.diagnosis,
      }),
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
        <SignupForm
          onFinish={onFinish}
          registeringAsParticipatingFamily={registeringAsParticipatingFamily}
          tokens={tokens}
        />
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupFormContainerProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(SignupFormContainer);
