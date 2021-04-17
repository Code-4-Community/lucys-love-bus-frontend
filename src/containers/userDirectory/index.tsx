import { Alert, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import protectedApiClient from '../../api/protectedApiClient';
import { ChungusContentContainer } from '../../components';
import UserInfoTable, { UserSummary } from '../../components/UserInfoTable';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
  asyncRequestIsNotStarted,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';

const { Title } = Typography;

const UserDirectory: React.FC = () => {
  const [users, setContacts] = useState<AsyncRequest<UserSummary[], any>>(
    AsyncRequestNotStarted(),
  );

  useEffect(() => {
    if (asyncRequestIsNotStarted(users)) {
      setContacts(AsyncRequestLoading());
      protectedApiClient
        .getAllUsersContactInfo()
        .then((c) => {
          setContacts(AsyncRequestCompleted(c));
        })
        .catch((error) => {
          setContacts(AsyncRequestFailed(error));
        });
    }
  }, [users]);

  return (
    <>
      <Helmet>
        <title>Event RSVP</title>
        <meta
          name="description"
          content="List of users who have RSVP'ed to this event."
        />
      </Helmet>
      <ChungusContentContainer>
        <Title level={3}>All Registered Members</Title>

        {asyncRequestIsComplete(users) && (
          <UserInfoTable
            users={users.result.map((user) => ({
              ...user,
              detailsLink: `/family-details/${user.userId}`,
            }))}
          />
        )}

        {asyncRequestIsLoading(users) && <Spin />}
        {asyncRequestIsFailed(users) && (
          <Alert
            message="Error"
            description={`There was an error loading registrations: ${users.error.message}`}
            type="error"
            showIcon
          />
        )}
      </ChungusContentContainer>
    </>
  );
};

export default UserDirectory;
