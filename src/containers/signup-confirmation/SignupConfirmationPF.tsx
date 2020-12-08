import React from 'react';
import { Helmet } from 'react-helmet';
import './signup-confirmation.less';
import { Typography } from 'antd';
import SignupConfirmationFormPF from '../../components/signup-confirmation/SignupConfirmationFormPF';

const { Title, Paragraph } = Typography;

const SignupConfirmationPF: React.FC = () => {
  return (
    <>
      <Helmet>
          <title>Signup Confirmation - Participating Family</title>
          <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
          <Title level={5} className="centered-text">SIGN UP</Title>
          <Title level={3} className="centered-text">Registering as a Participating Family</Title>
          <Paragraph className="centered-text">
            Please carefully read, review, and check the agreement boxes below in order to participate in programs
            through Lucy’s Love Bus to ensure the safety and comfort of all participants.
          </Paragraph>

          <SignupConfirmationFormPF> </SignupConfirmationFormPF>
      </div>
    </>
  );
};

export default SignupConfirmationPF;
