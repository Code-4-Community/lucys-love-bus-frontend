import { Button } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer } from '../../components';

const ErrorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Error</title>
        <meta name="description" content="Secret Error Page" />
      </Helmet>
      <ContentContainer>
        <Button
          danger
          onClick={() => {
            throw new Error('Omae wa mou shindeiru');
          }}
        >
          Do Not Touch
        </Button>
      </ContentContainer>
    </>
  );
};

export default ErrorPage;
