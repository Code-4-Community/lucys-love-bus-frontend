import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EventDetails from '../../components/event-details/EventDetails';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { getUpcomingEvents } from '../upcoming-events/ducks/thunks';
import { EventProps, EventsReducerState } from '../upcoming-events/ducks/types';

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

interface UpcomingEventsProps {
  readonly events: EventsReducerState['upcomingEvents'];
}

const SingleEvent: React.FC<UpcomingEventsProps> = ({ events }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (events.kind === AsyncRequestKinds.NotStarted) {
      dispatch(getUpcomingEvents());
    }
  }, []);

  const id: number = Number(useParams().id);

  const conditionalRenderEventDetails = (
    eventsList: AsyncRequest<EventProps[], any>,
  ) => {
    if (eventsList.kind === AsyncRequestKinds.Completed) {
      const event = eventsList.result.filter((e) => e.id === id);

      if (event.length > 0) {
        return <EventDetails {...event[0]} />;
      } else {
        return <p>That event does not exist!</p>;
      }
    } else if (eventsList.kind === AsyncRequestKinds.Failed) {
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
      <Helmet> </Helmet>
      <ContentContainer>
        {conditionalRenderEventDetails(events)}
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): UpcomingEventsProps => {
  return {
    events: state.eventsState.upcomingEvents,
  };
};

export default connect(mapStateToProps)(SingleEvent);
