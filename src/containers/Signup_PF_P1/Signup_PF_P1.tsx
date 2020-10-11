import React from 'react';
import { Helmet } from 'react-helmet';
import './Signup_PF_P1.less';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/SignupForm';

const { Title, Text, Paragraph } = Typography;

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
          {/*
          Place relevant components in here
        */}
          <Title>Registering as a Participating Family</Title>
          <Paragraph>Participating Families have early access to view events and are eligible to
            attend free of charge. After creating an account, your request will be reviewed
            by a member of our administration.
            *the following information will be associated with your account details</Paragraph>

          <SignupForm></SignupForm>

          <Link to="/" component={Typography.Link}>
            Also remember that you should link like this to make use of React
            Router!
          </Link>
        </div>
      </>
  );
};

export default Signup_PF_P1;
