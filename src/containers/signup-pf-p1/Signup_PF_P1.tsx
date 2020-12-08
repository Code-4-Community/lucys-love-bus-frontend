import React from 'react';
import { Helmet } from 'react-helmet';
import './signup-pf-p1.less';
import { Typography } from 'antd';
import PF1SignupForm from '../../components/signup-form/PF1SignupForm';

const { Title, Paragraph } = Typography;

/*
Template for future page components.

AntD Components:
https://ant.design/components/overview/
*/

// tslint:disable-next-line:variable-name
const Signup_PF_P1: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <div className="title">
          <Title level={5}>SIGN UP</Title>
          <Title level={3}>Registering as a Participating Family</Title>
          <Paragraph>
            Participating Families have early access to view events and are
            eligible to attend free of charge. After creating an account, your
            request will be reviewed by a member of our administration.
          </Paragraph>
          <Paragraph>Fields marked * are required.</Paragraph>
        </div>

        <Title level={5}>Account Owner Details</Title>

        <PF1SignupForm> </PF1SignupForm>
      </div>
    </>
  );
};

export default Signup_PF_P1;
