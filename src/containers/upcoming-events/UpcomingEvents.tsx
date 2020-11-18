import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography, Radio } from 'antd';
import EventsList from '../../components/events-list/EventsList';
import styled from 'styled-components';

const { Title } = Typography;

const ContentContainer = styled.div`
  padding: 24px;
  margin: auto;
  max-width: 1200px;
  width: 80%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledRadio = styled(Radio.Group)`
  margin: 12px;
`;

const StyledRadioButton = styled(Radio.Button)`
  .ant-radio-button-checked {
    background-color: #CE4A00;
    color: white;
  }
`;

const StyledTitle = styled(Title)`
  margin: 12px;
`;

const Events: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta name="Upcoming Events" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <Content>
          <StyledTitle>Upcoming Events</StyledTitle>
          <StyledRadio buttonStyle="solid" defaultValue="list">
            <StyledRadioButton className="ant-radio-checked" value="list">List</StyledRadioButton>
            <StyledRadioButton value="calendar">Calendar</StyledRadioButton>
          </StyledRadio>
        </Content>
        <EventsList></EventsList>
      </ContentContainer>
    </>
  );
};

export default Events;