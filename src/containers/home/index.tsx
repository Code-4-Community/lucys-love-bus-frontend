import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import { ContentContainer } from '../../components';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Code4Community</title>
        <meta
          name="Homepage"
          content="Welcome to Code4Community's frontend scaffold!"
        />
      </Helmet>
      <ContentContainer>
        <Title>Code4Community Frontend Scaffold</Title>
        <Title level={3}>
          Built with React.js, Typescript, Redux, and AntD components.
        </Title>
      </ContentContainer>
    </>
  );
};

export default Home;
