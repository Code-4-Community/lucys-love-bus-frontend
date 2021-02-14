import { Radio, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ChungusContentContainer } from '../../components';
import EventsList from '../../components/events-list/EventsList';
import { C4CState } from '../../store';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getUpcomingEvents } from './ducks/thunks';
import { EventsReducerState } from './ducks/types';

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

interface UpcomingEventsProps {
  readonly events: EventsReducerState['upcomingEvents'];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (events.kind === AsyncRequestKinds.NotStarted) {
      dispatch(getUpcomingEvents());
    }
  }, []);

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
        {events.kind === AsyncRequestKinds.Completed && (
          <EventsList events={events.result} />
        )}
      </ChungusContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): UpcomingEventsProps => {
  return {
    events: state.eventsState.upcomingEvents,
  };
};

export default connect(mapStateToProps)(UpcomingEvents);
