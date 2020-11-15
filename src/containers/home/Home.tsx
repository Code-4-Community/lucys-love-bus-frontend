import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Code4Community Frontend Scaffold</Title>
        <Title level={3}>
          Built with React.js, Typescript, and AntD components.
        </Title>
      </div>
    </>
  );
};

export default Home;
