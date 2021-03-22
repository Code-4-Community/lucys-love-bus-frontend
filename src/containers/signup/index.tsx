import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer } from '../../components';
import SignupDirectory from '../../components/SignupDirectory';

const Signup: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Signup Directory</title>
        <meta
          name="description"
          content="Sign up for Lucy's Love Bus Events."
        />
      </Helmet>
      <ContentContainer>
        <SignupDirectory />
      </ContentContainer>
    </>
  );
};

export default Signup;
