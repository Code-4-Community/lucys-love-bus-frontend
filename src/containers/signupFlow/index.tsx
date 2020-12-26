import React, { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import { ContentContainer } from '../../components';
import SignupDirectory from '../../components/SignupDirectory';
import { SignupState } from './ducks/types';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import GMSignupForm from '../../components/GMSignupForm';
import SignupVerification from '../../components/SignupVerification'
import SignupConfirmation from '../../components/SignupConfirmationForm'
import PF1SignupForm from '../../components/PF1SignupForm'
import PF2SignupForm from '../../components/PF2SignupForm'


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
              <SignupConfirmation groupTitle={'General Member'} backURL={'/signup/gm/1'} nextURL={'/signup/gm/verification/'}/>
          )}
        />
        <Route
          path="/signup/gm/verification"
          exact
          render={ () => (
              <SignupVerification groupTitle={'General Member'}/>
          )}
        />

        <Route
          path="/signup/pf/1"
          exact
          render={ () => (
              <PF1SignupForm/>
          )}
        />
        <Route
          path="/signup/pf/2"
          exact
          render={ () => (
              <PF2SignupForm/>
          )}
        />
        <Route
          path="/signup/pf/confirmation"
          exact
          render={ () => (
            <SignupConfirmation groupTitle={'Participating Family'}  backURL={'/signup/pf/2'} nextURL={'/signup/pf/verification/'}/>
          )}
        />
        <Route
          path="/signup/pf/verification"
          exact
          render={ () => (
              <SignupVerification groupTitle={'Participating Family'}/>
          )}
        />
      </ContentContainer>
    </>
  );
};

export default SignupFlow;
