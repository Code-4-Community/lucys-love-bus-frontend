import React from 'react';
import { Helmet } from 'react-helmet';
import EventDetails from '../../components/event-details/EventDetails';
import styled from 'styled-components';
import {EventProps} from '../upcoming-events/ducks/types';

const event1: EventProps = {
  title: 'Event 1',
  date: new Date(2020, 6, 21),
  time: '3:00PM',
  description: 'This is a test event',
  thumbnail:
      'https://www.stockvault.net/data/2012/06/19/131807/thumb16.jpg',
  location: 'Zoom',
};


const ContentContainer = styled.div`
  padding: 24px;
  margin: auto;
  max-width: 1200px;
  width: 80%;
`;


const SingleEvent: React.FC = () => {
  return (
      <>
        <Helmet> </Helmet>
        <ContentContainer>
          <EventDetails {...event1} />
        </ContentContainer>
      </>
  );
};

export default SingleEvent;
