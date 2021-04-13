import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { ChungusContentContainer } from '../../components';
import ContactInfoSummary from '../../components/ContactInfoSummary';
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

const FamilyDetails: React.FC = () => {
  const dispatch = useDispatch();
  const id = Number(useParams<{ id: string }>().id);
  const [contacts, setContacts] = useState<AsyncRequest<ContactInfo, any>>(
    AsyncRequestNotStarted(),
  );

  useEffect(() => {
    if (asyncRequestIsNotStarted(contacts)) {
      setContacts(AsyncRequestLoading());
      protectedApiClient
        .getContactInfoById(id)
        .then((c) => {
          setContacts(AsyncRequestCompleted(c));
        })
        .catch((error) => {
          setContacts(AsyncRequestFailed(error));
        });
    }
  }, [dispatch, contacts, id]);

  return (
    <>
      <Helmet>
        <title>View Family Details</title>
        <meta
          name="description"
          content="Specific details about a registered family."
        />
      </Helmet>
      <ChungusContentContainer>
        {asyncRequestIsComplete(contacts) && (
          <ContactInfoSummary userId={id} info={contacts.result} />
        )}
        {asyncRequestIsLoading(contacts) && <Spin />}
        {asyncRequestIsFailed(contacts) && (
          <Alert
            message="Error"
            description={contacts.error.message}
            type="error"
            showIcon
          />
        )}
      </ChungusContentContainer>
    </>
  );
};

export default FamilyDetails;
