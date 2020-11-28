import React from 'react';
import { Helmet } from 'react-helmet';
import './signup-gm.less';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import GMSignupForm from '../../components/SignupForm/GMSignupForm';

const { Title, Paragraph } = Typography;

const SignupGM: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - General Member</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <div className="initial-text">
          <Title>Registering as a General Member</Title>
          <Paragraph>
            General members may navigate the event calendar and purchase tickets
            once registration is open. If you, or a member of your family, have
            a life-threatening illness, consider registering as a{' '}
            <Link to="/signup-pf" component={Typography.Link}>
              Participating Family
            </Link>{' '}
            to register free of charge.
          </Paragraph>
          <Paragraph>Fields marked * are required.</Paragraph>
        </div>

        <GMSignupForm></GMSignupForm>
      </div>
    </>
  );
};

export default SignupGM;
