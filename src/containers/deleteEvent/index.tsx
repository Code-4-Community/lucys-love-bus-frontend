import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { ContentContainer } from '../../components';
import { Routes } from '../../App';
import { deleteAnEvent } from '../createEvent/ducks/thunks';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
const { Title } = Typography;

const StyledButton = styled(Button)`
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background-color: #2d870d;
  margin: 0 16px 32px 0;
  padding: 8px 16px;
`;

const StyledLinkButton = styled(LinkButton)`
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background-color: #2d870d;
  margin: 0 16px 32px 0;
  padding: 8px 16px;
`;

const RedButton = styled(StyledButton)`
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: white;
  display: 'inline' 

  &:hover {
    border-color: #ff4d4f;
    color: #ff4d4f;
  }

  &:focus {
    background-color: white;
    color: #ff4d4f;
    border-color: #ff4d4f;
  }
`;

const GrayButton = styled(StyledLinkButton)`
  background-color: white;
  color: #595959;
  display: 'inline' 

  &:hover {
    border-color: #595959;
    color: white;
    background-color: #595959;
  }

  &:focus {
    background-color: white;
    color: #595959;
    border-color: #595959;
  }
`;

interface SingleEventParams {
  id: string;
}

const BASE_EVENTS_ROUTE = '/events/';

const DeleteEvent: React.FC = () => {
    
    const dispatch = useDispatch();
    const id = Number(useParams<SingleEventParams>().id);

    const onClick = async () => {
        dispatch(deleteAnEvent(id));
      };

  return (
    <>
      <Helmet>
        <title>Confirm Delete Event</title>
        <meta name="Delete Event" content="Are you sure?" />
      </Helmet>
      <ContentContainer>
        <Title level={2}>Are you sure you want to delete this event?</Title>

        <RedButton onClick={onClick}>Delete</RedButton>
        <GrayButton to={`${BASE_EVENTS_ROUTE}/${id}`}>Cancel</GrayButton>
      </ContentContainer>
    </>
  );
};

export default DeleteEvent;
