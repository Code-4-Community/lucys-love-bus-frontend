import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography, Radio } from 'antd';
import EventsList from '../../components/events-list/EventsList';
import styled from 'styled-components';
import { ChungusContentContainer } from '../../components';
import { ORANGE } from '../../colors';


const { Title } = Typography;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledRadio = styled(Radio.Group)`
  margin: 12px;
`;

const StyledTitle = styled(Title)`
  margin: 12px;
  margin-left: 0px;
`;

const Events: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta name="Upcoming Events" content="Description goes here." />
      </Helmet>
      <ChungusContentContainer>
        <Content>
          <StyledTitle>Upcoming Events</StyledTitle>
          <StyledRadio buttonStyle="solid" defaultValue="list">
            <Radio.Button value="list">List</Radio.Button>
            <Radio.Button value="calendar">Calendar</Radio.Button>
          </StyledRadio>
        </Content>
        <EventsList></EventsList>
      </ChungusContentContainer>
    </>
  );
};

export default Events;
