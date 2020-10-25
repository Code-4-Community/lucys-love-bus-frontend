import React from 'react';
import { Helmet } from 'react-helmet';
import './signup-confirmation.less';
import { Typography } from 'antd';
import SignupConfirmation from '../../components/signup-confirmation/SignupConfirmation';

const { Title, Text, Paragraph } = Typography;

const SignupConfirmationGM: React.FC = () => {
  return (
      <>
        <Helmet>
          <title>Signup Confirmation - Participating Family</title>
          <meta name="description" content="Description goes here." />
        </Helmet>
        <div className="content-container">
            <Paragraph className="sign-up">Sign Up</Paragraph>

            <Title className="signup-title">Registering as a General Member</Title>

            <Paragraph className="signup-confirmation-info"> Please carefully read, review, and check the agreement boxes below in order to participate in
                programs through Lucy’s Love Bus to ensure the safety and comfort of all participants. </Paragraph>

            <SignupConfirmation> </SignupConfirmation>
        </div>
      </>
  );
};

export default SignupConfirmationGM;
