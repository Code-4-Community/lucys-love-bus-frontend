import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { ContentContainer } from '../../components';
import { Routes } from '../../App';
import authClient from '../../auth/authClient';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsNotStarted,
  AsyncRequestKinds,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';

const VerifyEmail: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const [status, setStatus] = useState<AsyncRequest>(AsyncRequestNotStarted());

  useEffect(() => {
    if (asyncRequestIsNotStarted(status)) {
      setStatus(AsyncRequestLoading());
      authClient
        .verifyEmail(key)
        .then(() => {
          setStatus(AsyncRequestCompleted(undefined));
        })
        .catch((error) => {
          setStatus(AsyncRequestFailed(error));
        });
    }
  }, [status, key]);

  return (
    <>
      <Helmet>
        <title>Verify Email</title>
        <meta name="verifyEmail" content="Email verification page." />
      </Helmet>
      <ContentContainer>
        {(() => {
          switch (status.kind) {
            case AsyncRequestKinds.Failed:
              return (
                <>
                  <Typography.Paragraph>
                    Unable to verify email
                  </Typography.Paragraph>
                  <Link to={Routes.HOME}>
                    <Typography.Link>Take me back home!</Typography.Link>
                  </Link>
                </>
              );
            case AsyncRequestKinds.Loading:
              return <Typography.Paragraph>Loading...</Typography.Paragraph>;
            case AsyncRequestKinds.Completed:
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
