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
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <Title>Oops! We can't find the page you're looking for.</Title>

        <Link to={Routes.HOME}>
          <Typography.Link>Take me back home!</Typography.Link>
        </Link>
      </ContentContainer>
    </>
  );
};

export default NotFound;
