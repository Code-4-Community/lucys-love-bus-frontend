import React, { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import { ContentContainer } from '../../components';
import SignupDirectory from '../../components/SignupDirectory';
import { SignupState } from './ducks/types';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import GMSignupForm from '../../components/GMSignupForm';
import GMSignupVerification from '../../components/SignupVerificationGM'
import GMSignupConfirmation from '../../components/SignupConfirmationFormGM'

const { Title, Paragraph } = Typography;
const SignupFlow: React.FC = () => {
  const [signupState, setSignupState] = useState<SignupState>(
    SignupState.SignupDirectory,
  );


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
          render={ () => <>
          <SignupDirectory/>
          </>}
        />



        <Route
          path="/signup/gm/1"
          exact
          render={ () => (
              <GMSignupForm/>
          )}
        />

        <Route
          path="/signup/gm/confirmation"
          exact
          render={ () => (
              <GMSignupConfirmation/>
          )}
        />
        <Route
          path="/signup/gm/verification"
          exact
          render={ () => (
              <GMSignupVerification/>
          )}
        />
      </ContentContainer>
    </>
  );
};

export default SignupFlow;
