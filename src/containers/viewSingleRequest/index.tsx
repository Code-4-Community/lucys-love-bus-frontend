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
import { ChungusContentContainer } from '../../components';
import ContactInfoSummary from '../../components/ContactInfoSummary';
import { Alert, Button, Spin } from 'antd';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
import protectedApiClient from '../../api/protectedApiClient';
import DecisionConfirmation from '../../components/DecisionConfirmation';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { useHistory } from 'react-router';

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

const StyledAlert = styled(Alert)`
  margin-left: 20%;
  max-width: 60%;
`;

const ViewSingleRequest = () => {
  const history = useHistory();
  const requestId = Number(
    useParams<{ request_id: string; user_id: string }>().request_id,
  );
  const [contacts, setContacts] = useState<AsyncRequest<ContactInfo, any>>(
    AsyncRequestNotStarted(),
  );
  const [decision, setDecision] = useState<AsyncRequest<void, any>>(
    AsyncRequestNotStarted(),
  );
  const [status, setStatus] = useState<Status>(Status.PENDING);

  const denyRequest = () => {
    setDecision(AsyncRequestLoading());
    protectedApiClient
      .denyPFRequest(requestId)
      .then((res) => {
        setDecision(AsyncRequestCompleted(res));
        setStatus(Status.DENIED);
      })
      .catch((error) => {
        setDecision(AsyncRequestFailed(error));
      });
  };

  const approveRequest = () => {
    setDecision(AsyncRequestLoading());
    protectedApiClient
      .approvePFRequest(requestId)
      .then((res) => {
        setDecision(AsyncRequestCompleted(res));
        setStatus(Status.APPROVED);
      })
      .catch((error) => {
        setDecision(AsyncRequestFailed(error));
      });
  };

  useEffect(() => {
    if (asyncRequestIsNotStarted(contacts)) {
      setContacts(AsyncRequestLoading());
      protectedApiClient
        .getRequestContactInfoById(requestId)
        .then((c) => {
          setContacts(AsyncRequestCompleted(c));
          // redirect to NotFound component if this request has already been dealt with
          if (
            !c.privilegeLevel ||
            c.privilegeLevel.toLowerCase() !== PrivilegeLevel.STANDARD
          ) {
            history.push('/404');
          }
        })
        .catch((error) => {
          setContacts(AsyncRequestFailed(error));
        });
    }
  }, [contacts, requestId]);

  if (status === Status.APPROVED && asyncRequestIsComplete(contacts)) {
    return (
      <DecisionConfirmation
        approved={true}
        contactInformation={contacts.result}
      />
    );
  } else if (status === Status.DENIED && asyncRequestIsComplete(contacts)) {
    return (
      <DecisionConfirmation
        approved={false}
        contactInformation={contacts.result}
      />
    );
  } else {
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
            <ContactInfoSummary
              userId={contacts.result.mainContact.id || -1}
              info={contacts.result}
            />
          )}
          {asyncRequestIsLoading(contacts) && <Spin />}
          {asyncRequestIsFailed(contacts) && (
            <StyledAlert
              message="Error"
              description={contacts.error.message}
              type="error"
              showIcon
            />
          )}
        </ChungusContentContainer>
        {asyncRequestIsLoading(decision) ? (
          <Spin />
        ) : (
          <DecisionButtons>
            <StyledButton
              type="default"
              danger
              disabled={
                !asyncRequestIsComplete(contacts) ||
                asyncRequestIsLoading(decision)
              }
              onClick={() => {
                denyRequest();
              }}
            >
              Deny
            </StyledButton>
            <StyledButton
              type="primary"
              disabled={
                !asyncRequestIsComplete(contacts) ||
                asyncRequestIsLoading(decision)
              }
              onClick={() => {
                approveRequest();
              }}
            >
              Approve
            </StyledButton>
          </DecisionButtons>
        )}
        {asyncRequestIsFailed(decision) && (
          <StyledAlert
            message="Error"
            description={
              decision.error.response
                ? decision.error.response.data
                : decision.error.message
            }
            type="error"
            showIcon
          />
        )}
      </>
    );
  }
};

export default ViewSingleRequest;
