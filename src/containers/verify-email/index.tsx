import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { ContentContainer } from '../../components';
import { Routes } from '../../App';
import authClient from '../../auth/authClient';
const { Title } = Typography;

enum Status {
  SUCCESS = 1,
  WAITING = 0,
  FAILURE = -1
}

const VerifyEmail: React.FC = () => {
  const { key } = useParams();
  const [status, setStatus] = useState<Status>(0);

  useEffect(() => {
    if (status === Status.WAITING) {
      // make a request
      authClient.verifyEmail(key).then(() => {
        setStatus(Status.SUCCESS);
      }).catch(() => {
        setStatus(Status.FAILURE);
      })
    }
  });

  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        {/*<Title>Oops! We can't find the page you're looking for.</Title>*/}
        {(() => {
          switch (status) {
            case Status.FAILURE:
              return (
                <>
                  <Typography.Paragraph>Unable to verify email</Typography.Paragraph>
                  <Link to={Routes.HOME}>
                    <Typography.Link>Take me back home!</Typography.Link>
                  </Link>
                </>
              );
            case Status.WAITING:
              return (<Typography.Paragraph>Loading...</Typography.Paragraph>);
            case Status.SUCCESS:
              return (
                <>
                  <Typography.Paragraph>Email verified!</Typography.Paragraph>
                  <Link to={Routes.HOME}>
                    <Typography.Link>Take me back home!</Typography.Link>
                  </Link>
                </>
              );
          }
        })()}
      </ContentContainer>
    </>
  );
};

export default VerifyEmail;
