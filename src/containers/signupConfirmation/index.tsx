import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer } from '../../components';
import ConfirmationMessage from '../../components/ConfirmationMessage';

const SignupConfirmation: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta
          name="description"
          content="Sign up confirmation for Lucy's Love Bus Events."
        />
      </Helmet>
      <ContentContainer>
        <>
          <Helmet>
            <title>Signup Confirmation</title>
          </Helmet>
          <ConfirmationMessage
            title="SIGN UP"
            message="Verify Email"
            details={
              'We are incredibly excited for you to become a member of The Sajni Center. You will receive a confirmation email shortly.'
            }
          />
        </>
      </ContentContainer>
    </>
  );
};

export default SignupConfirmation;
