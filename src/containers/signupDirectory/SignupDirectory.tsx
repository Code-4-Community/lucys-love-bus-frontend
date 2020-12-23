import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer } from '../../components';
import SignupDirectory from '../../components/signupDirectory/SignupDirectory';
/*
Template for future page components.

AntD Components:
https://ant.design/components/overview/
*/

const Template: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <SignupDirectory />
      </ContentContainer>
    </>
  );
};

export default Template;
