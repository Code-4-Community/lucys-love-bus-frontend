import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EventDetails from '../../components/event-details/EventDetails';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsNotStarted,
} from '../../utils/asyncRequest';
import { getUpcomingEvents } from '../upcoming-events/ducks/thunks';
import { getEventAnnouncements } from './ducks/thunks';
import { EventsReducerState } from '../upcoming-events/ducks/types';
import { EventAnnouncementsReducerState } from './ducks/types';

const ContentContainer = styled.div`
  padding: 24px;
  margin: auto;
  max-width: 1200px;
  width: 80%;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface SingleEventProps {
  readonly events: EventsReducerState['upcomingEvents'];
  readonly eventAnnouncements: EventAnnouncementsReducerState['eventAnnouncements'];
}

interface SingleEventParams {
  id: string;
}

const SingleEvent: React.FC<SingleEventProps> = ({
  events,
  eventAnnouncements,
}) => {
  const dispatch = useDispatch();
  const id = Number(useParams<SingleEventParams>().id);

  useEffect(() => {
    if (
      asyncRequestIsNotStarted(events) ||
      asyncRequestIsFailed(events) ||
      asyncRequestIsNotStarted(eventAnnouncements) ||
      asyncRequestIsFailed(eventAnnouncements)
    ) {
      dispatch(getUpcomingEvents());
      dispatch(getEventAnnouncements(id));
    }
  }, [dispatch, events, eventAnnouncements, id]);

  useEffect(() => {
    dispatch(getUpcomingEvents());
    dispatch(getEventAnnouncements(id));
  }, [dispatch, id]);

  const conditionalRenderEventDetails = () => {
    if (
      asyncRequestIsComplete(events) &&
      asyncRequestIsComplete(eventAnnouncements)
    ) {
      const event = events.result.filter((e) => e.id === id);

      if (event.length > 0) {
        return (
          <EventDetails
            {...event[0]}
            announcements={eventAnnouncements.result}
          />
        );
      } else {
        return <p>That event does not exist!</p>;
      }
    } else if (asyncRequestIsFailed(events)) {
      return <p>The request failed.</p>;
    } else {
      return (
        <CenteredContainer>
          <Spin size="large" />
        </CenteredContainer>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Event</title>
        <meta
          name="Lucy's Love Bus Events"
          content="An event hosted through Lucy's Love Bus Programs."
        />
      </Helmet>
      <ContentContainer>{conditionalRenderEventDetails()}</ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): SingleEventProps => {
  return {
    events: state.eventsState.upcomingEvents,
    eventAnnouncements: state.eventAnnouncementsState.eventAnnouncements,
  };
};

export default connect(mapStateToProps)(SingleEvent);
