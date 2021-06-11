import { Radio, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { ChungusContentContainer } from '../../components';
import Calendar from '../../components/Calendar';
import EventsList from '../../components/events-list/EventsList';
import { LinkButton } from '../../components/LinkButton';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
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

enum EventView {
  List,
  Calendar,
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUpcomingEvents());
  }, [dispatch]);

  const [view, setView] = useState<EventView>(EventView.List);
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta name="description" content="Upcoming events for LLB." />
      </Helmet>
      <ChungusContentContainer>
        <Content>
          <StyledTitle>Upcoming Events</StyledTitle>
          <StyledRadio buttonStyle="solid" defaultValue={view}>
            <Radio.Button
              value={EventView.List}
              onChange={() => setView(EventView.List)}
            >
              List
            </Radio.Button>
            <Radio.Button
              value={EventView.Calendar}
              onChange={() => setView(EventView.Calendar)}
            >
              Calendar
            </Radio.Button>
          </StyledRadio>
          {privilegeLevel === PrivilegeLevel.ADMIN && (
            <LinkButton type="primary" to={Routes.CREATE_EVENT}>
              Create Event
            </LinkButton>
          )}
        </Content>

        {asyncRequestIsComplete(events) &&
          (view === EventView.List ? (
            <EventsList events={events.result} />
          ) : (
            <Calendar events={events.result} />
          ))}
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
