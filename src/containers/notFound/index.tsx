import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { ContentContainer } from '../../components';
import { Routes } from '../../App';
const { Title } = Typography;

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
        <meta name="description" content="Page not found." />
      </Helmet>
      <ContentContainer>
        <Title>Oops! We can't find the page you're looking for.</Title>

        <Link to={Routes.HOME}>Take me back home!</Link>
      </ContentContainer>
    </>
  );
};

export default NotFound;
