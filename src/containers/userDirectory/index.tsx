import { Alert, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import protectedApiClient from '../../api/protectedApiClient';
import { ChungusContentContainer } from '../../components';
import UserInfoTable from '../../components/UserInfoTable';
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
import { ContactInfo } from '../setContacts/ducks/types';

const { Title, Link } = Typography;

const UserDirectory: React.FC<> = () => {
  const [contacts, setContacts] = useState<AsyncRequest<ContactInfo[], any>>(
    AsyncRequestNotStarted(),
  );

  useEffect(() => {
    if (asyncRequestIsNotStarted(contacts)) {
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
  }, [contacts]);

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

        {/* {asyncRequestIsComplete(contacts) && (
          <UserInfoTable users={contacts.result.map(contact => ({
            firstName: contact.mainContact.firstName,
            lastName: contact.mainContact.firstName,
            email: contact.mainContact.firstName,
            userId: contact.mainContact.id,
            privilegeLevel: contact.mainContact,
            phoneNumber: string;
            profilePicture: string | null;
            photoRelease: boolean;
            detailsLink: string;
          }))} />
        )} */}

        {asyncRequestIsLoading(contacts) && <Spin />}
        {asyncRequestIsFailed(contacts) && (
          <Alert
            message="Error"
            description={`There was an error loading registrations: ${contacts.error.message}`}
            type="error"
            showIcon
          />
        )}
      </ChungusContentContainer>
    </>
  );
};

export default UserDirectory;
