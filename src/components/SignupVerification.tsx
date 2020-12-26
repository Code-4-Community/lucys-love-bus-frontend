import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import FormContainer from './FormContainer'
const { Title, Paragraph } = Typography;

const SignupVerification: React.FC<{groupTitle : string}> = ({groupTitle}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Signup Confirmation - {groupTitle}</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <FormContainer>
        <Title level={5} className="centered-text">
          VERIFY EMAIL
        </Title>
        <Title level={3} className="centered-text">
          Thank you for signing up!
        </Title>
        <Paragraph className="centered-text">
          {' '}
          We are incredibly excited for you to become a {groupTitle} at The
          Sajni Center. An Admin will be reviewing your request, and you will
          receive a confirmation email shortly.{' '}
        </Paragraph>
      </FormContainer>
    </>
  );
};

export default SignupVerification;
