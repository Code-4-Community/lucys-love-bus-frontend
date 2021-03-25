import { Alert, Input, Select, Typography, Upload } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../App';
import { signup } from '../../auth/ducks/thunks';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import ConfirmationMessage from '../../components/confirmationMessage';
import SignupForm from '../../components/signupForm';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { ORANGE } from '../../utils/colors';
import { convertToYearMonthDateString } from '../../utils/dateUtils';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';
import { participatingFamilySearchQueryFlag } from '../../utils/signupFlow';
import { SignupData } from './ducks/types';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const PaddedAlert = styled(Alert)`
  margin-top: 1em;
  margin-bottom: 2em;
`;

const CenteredTitle = styled(Title)`
  text-align: center;
`;
const CenteredOrangeTitle = styled.h1`
  text-align: center;
  font-weight: 800;
  font-size: 2em;
  color: ${ORANGE};
`;
const CenteredParagraph = styled(Paragraph)`
  text-align: center;
`;

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
      // TODO: if PF then route to set contacts with the PF query parameter pf
      history.push(Routes.HOME);
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
        {asyncRequestIsComplete(tokens) ? (
          <>
            <Helmet>
              <title>Signup Confirmation</title>
            </Helmet>
            <ConfirmationMessage
              title="VERIFY EMAIL"
              message="Thank you for signing up!"
              details={
                'We are incredibly excited for you to become a member of The Sajni Center. You will receive a confirmation email shortly.'
              }
            />
          </>
        ) : (
          <SignupForm
            onFinish={onFinish}
            registeringAsParticipatingFamily={registeringAsParticipatingFamily}
            tokens={tokens}
          />
        )}
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
