import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { ContentContainer } from '../../components';
import { Routes } from '../../App';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';
import protectedApiClient from '../../api/protectedApiClient';
import { MED_GRAY, PRIMARY, RED } from '../../utils/colors';
const { Title } = Typography;

const StyledButton = styled(Button)`
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background-color: ${PRIMARY};
  margin: 0 16px 32px 0;
  padding: 8px 16px;
`;

const StyledLinkButton = styled(LinkButton)`
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background-color: ${PRIMARY};
  margin: 0 16px 32px 0;
  padding: 8px 16px;
`;

const RedButton = styled(StyledButton)`
  background-color: ${RED};
  border-color: ${RED};
  color: white;
  display: 'inline' 

  &:hover {
    border-color: ${RED};
    color: ${RED};
  }

  &:focus {
    background-color: white;
    color: ${RED};
    border-color: ${RED};
  }
`;

const GrayButton = styled(StyledLinkButton)`
  background-color: white;
  color: ${MED_GRAY};
  display: 'inline' 

  &:hover {
    border-color: ${MED_GRAY};
    color: white;
    background-color: ${MED_GRAY};
  }

  &:focus {
    background-color: white;
    color: ${MED_GRAY};
    border-color: ${MED_GRAY};
  }
`;

interface SingleEventParams {
  id: string;
}

const DeleteEvent: React.FC = () => {
  const history = useHistory();
  const id = Number(useParams<SingleEventParams>().id);
  const [deleteEventRequest, setDeleteEventRequest] = useState<
    AsyncRequest<void, any>
  >(AsyncRequestNotStarted());

  const onDelete = async () => {
    try {
      setDeleteEventRequest(AsyncRequestLoading());
      await protectedApiClient.deleteEvent(id);
      setDeleteEventRequest(AsyncRequestCompleted(undefined));
    } catch (err) {
      setDeleteEventRequest(AsyncRequestFailed(err));
    }
  };

  if (asyncRequestIsComplete(deleteEventRequest)) {
    history.push(Routes.UPCOMING_EVENTS);
  }

  return (
    <>
      <Helmet>
        <title>Confirm Delete Event</title>
        <meta name="description" content="Delete event" />
      </Helmet>
      <ContentContainer>
        <Title level={2}>Are you sure you want to delete this event?</Title>

        <RedButton onClick={onDelete}>Delete</RedButton>
        <GrayButton to={Routes.EVENT_BASE_ROUTE + id}>Cancel</GrayButton>
      </ContentContainer>
    </>
  );
};

export default DeleteEvent;
