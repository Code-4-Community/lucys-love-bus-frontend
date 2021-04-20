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
import { Helmet } from 'react-helmet';
import { ChungusContentContainer, ContentContainer } from '../../components';
import ContactInfoSummary from '../../components/ContactInfoSummary';
import { Alert, Spin, Button, Table, Typography } from 'antd';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';

const { Title } = Typography;

enum Status {
  PENDING,
  APPROVED,
  DENIED,
}

const DecisionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const StyledText = styled(Typography)`
  align-items: center;
`;

const ViewSingleRequest = () => {
  const requestId = Number(
    useParams<{ request_id: string; user_id: string }>().request_id,
  );
  const userId = Number(
    useParams<{ request_id: string; user_id: string }>().user_id,
  );
  const [contacts, setContacts] = useState<AsyncRequest<ContactInfo, any>>(
    AsyncRequestNotStarted(),
  );
  const [status, setStatus] = useState<Status>(Status.PENDING);

  const denyRequest = () => {
    protectedApiClient
      .denyPFRequest(requestId)
      .then((res) => setStatus(Status.DENIED));
  };

  const approveRequest = () => {
    protectedApiClient
      .approvePFRequest(requestId)
      .then((res) => setStatus(Status.APPROVED));
  };

  useEffect(() => {
    if (asyncRequestIsNotStarted(contacts)) {
      setContacts(AsyncRequestLoading());
      protectedApiClient
        .getContactInfoById(userId)
        .then((c) => {
          setContacts(AsyncRequestCompleted(c));
        })
        .catch((error) => {
          setContacts(AsyncRequestFailed(error));
        });
    }
  }, [contacts, userId]);

  switch (status) {
    case Status.PENDING:
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
              <ContactInfoSummary userId={userId} info={contacts.result} />
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
            <StyledButton
              type="default"
              danger
              onClick={() => {
                denyRequest();
              }}
            >
              Deny
            </StyledButton>
            <StyledButton
              type="primary"
              onClick={() => {
                approveRequest();
              }}
            >
              Approve
            </StyledButton>
          </DecisionButtons>
        </>
      );
    case Status.APPROVED:
      return (
        <ContentContainer>
          <Title>The {contacts.result.mainContact.lastName} Family has been approved</Title>
          <StyledText>
            An email to congratulate the new Participating Family is on its way.
            Use the account owner’s details below for additional communications.
          </StyledText>
          <Button to={Routes.HOME}>Done</Button>
        </ContentContainer>
      );
    case Status.DENIED:
      return (
        <ContentContainer>
          <Title>The {user.lastName} Family has been denied</Title>
          <StyledText>
            Is more information needed? Did you spot a mistake? Use the account
            owner’s details below to reach out and clarify, or inquire.
          </StyledText>
          <Button to={Routes.HOME}>Done</Button>
        </ContentContainer>
      );
  }
};

export default ViewSingleRequest;
