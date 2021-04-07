import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import EventDetails from '../../components/event-details/EventDetails';
import { LinkButton } from '../../components/LinkButton';
import { C4CState } from '../../store';
import {
  AsyncRequest,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsNotStarted,
} from '../../utils/asyncRequest';
import { getUpcomingEvents } from '../upcoming-events/ducks/thunks';
import { EventProps, EventsReducerState } from '../upcoming-events/ducks/types';

const BASE_EVENTS_ROUTE = '/events/';

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

const AdminActionButtonList = styled.div`
  display: flex;
`;

const StyledButton = styled(LinkButton)`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background-color: #2d870d;
  margin: 0 16px 32px 0;
  padding: 8px 16px;
`;

const GreenButton = styled(StyledButton)`
  background-color: #2d870d;
  color: #ffffff;
`;

const RedButton = styled(StyledButton)`
  background-color: #ff4d4f;
  border-color: #ff4d4f;

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

const GrayButton = styled(StyledButton)`
  background-color: white;
  color: #595959;

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

interface SingleEventProps {
  readonly events: EventsReducerState['upcomingEvents'];
}

interface SingleEventParams {
  id: string;
}

const SingleEvent: React.FC<SingleEventProps> = ({ events }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (asyncRequestIsNotStarted(events) || asyncRequestIsFailed(events)) {
      dispatch(getUpcomingEvents());
    }
  }, [dispatch, events]);

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  const id = Number(useParams<SingleEventParams>().id);

  const conditionalRenderEventDetails = (
    eventsList: AsyncRequest<EventProps[], any>,
  ) => {
    if (asyncRequestIsComplete(eventsList)) {
      const event = eventsList.result.filter((e) => e.id === id);

      if (event.length > 0) {
        return (
          <>
            {privilegeLevel === PrivilegeLevel.ADMIN && (
              <AdminActionButtonList>
                <GreenButton to={BASE_EVENTS_ROUTE + id}>Edit</GreenButton>
                <GreenButton to={BASE_EVENTS_ROUTE + id}>
                  Make Announcement
                </GreenButton>
                <RedButton to={BASE_EVENTS_ROUTE + id}>Delete Event</RedButton>
                <GrayButton to={BASE_EVENTS_ROUTE + id}>View RSVP</GrayButton>
              </AdminActionButtonList>
            )}
            <EventDetails {...event[0]} />
          </>
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
    events: state.eventsState.upcomingEvents,
  };
};

export default connect(mapStateToProps)(SingleEvent);
