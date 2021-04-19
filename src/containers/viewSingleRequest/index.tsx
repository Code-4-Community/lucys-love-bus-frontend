import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import protectedApiClient from '../../api/protectedApiClient';
import { Helmet } from 'react-helmet';
import { ChungusContentContainer } from '../../components';
import ContactInfoSummary from '../../components/ContactInfoSummary';
import { Alert, Spin, Button, Table } from 'antd';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';

const DecisionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const ViewSingleRequest = () => {
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
  }, [contacts, id]);

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
        <LinkButton type="link" to={'/view-requests/'}>
          &lt; Back to Requests
        </LinkButton>
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
      <DecisionButtons>
        <StyledButton type="primary" danger>
          Deny
        </StyledButton>
        <StyledButton type="primary">Approve</StyledButton>
      </DecisionButtons>
    </>
  );
};

export default ViewSingleRequest;
