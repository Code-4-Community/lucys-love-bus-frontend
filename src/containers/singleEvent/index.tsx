import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EventDetails from '../../components/event-details/EventDetails';
import { C4CState } from '../../store';
import {
  AsyncRequest,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsNotStarted,
} from '../../utils/asyncRequest';
import { getUpcomingEvents } from '../upcoming-events/ducks/thunks';
import { EventProps, EventsReducerState } from '../upcoming-events/ducks/types';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';

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
  readonly tokens: UserAuthenticationReducerState['tokens'];
  readonly events: EventsReducerState['upcomingEvents'];
}

interface SingleEventParams {
  id: string;
}

const SingleEvent: React.FC<SingleEventProps> = ({ tokens, events }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (asyncRequestIsNotStarted(events) || asyncRequestIsFailed(events)) {
      dispatch(getUpcomingEvents());
    }
  }, [dispatch, events]);

  const id = Number(useParams<SingleEventParams>().id);

  const conditionalRenderEventDetails = (
    eventsList: AsyncRequest<EventProps[], any>,
  ) => {
    if (asyncRequestIsComplete(eventsList)) {
      const event = eventsList.result.filter((e) => e.id === id);

      if (event.length > 0) {
        return (
          <EventDetails
            {...event[0]}
            privilegeLevel={getPrivilegeLevel(tokens)}
          />
        );
      } else {
        return <p>That event does not exist!</p>;
      }
    } else if (asyncRequestIsFailed(eventsList)) {
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
      <ContentContainer>
        {conditionalRenderEventDetails(events)}
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): SingleEventProps => {
  return {
    tokens: state.authenticationState.tokens,
    events: state.eventsState.upcomingEvents,
  };
};

export default connect(mapStateToProps)(SingleEvent);
