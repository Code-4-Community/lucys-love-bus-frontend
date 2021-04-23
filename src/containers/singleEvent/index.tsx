import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import EventDetails from '../../components/event-details/EventDetails';
import { LinkButton } from '../../components/LinkButton';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
} from '../../utils/asyncRequest';
import { getMyEvents } from '../myEvents/ducks/thunks';
import { MyEventsReducerState } from '../myEvents/ducks/types';
import { getUpcomingEvents } from '../upcoming-events/ducks/thunks';
import { EventsReducerState } from '../upcoming-events/ducks/types';
import { getEventAnnouncements } from './ducks/thunks';
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
  color: white;

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
  readonly tokens: UserAuthenticationReducerState['tokens'];
  readonly events: EventsReducerState['upcomingEvents'];
  readonly myEvents: MyEventsReducerState['myEvents'];
  readonly eventAnnouncements: EventAnnouncementsReducerState['eventAnnouncements'];
}

interface SingleEventParams {
  id: string;
}

const SingleEvent: React.FC<SingleEventProps> = ({
  tokens,
  events,
  myEvents,
  eventAnnouncements,
}) => {
  const dispatch = useDispatch();
  const id = Number(useParams<SingleEventParams>().id);

  useEffect(() => {
    dispatch(getUpcomingEvents());
    if (asyncRequestIsComplete(tokens)) {
      dispatch(getMyEvents());
      dispatch(getEventAnnouncements(id));
    }
  }, [dispatch, id, tokens]);

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  const conditionalRenderEventDetails = () => {
    if (asyncRequestIsComplete(events)) {
      let event;
      if (asyncRequestIsComplete(myEvents)) {
        event = myEvents.result.find((e) => e.id === id);
      }
      if (!event) {
        event = events.result.find((e) => e.id === id);
      }
      const hasRegistered =
        (event && event.ticketCount && event.ticketCount > 0) !== undefined;
      if (event) {
        return (
          <>
            {privilegeLevel === PrivilegeLevel.ADMIN && (
              <AdminActionButtonList>
                <GreenButton to={Routes.EDIT_EVENT_BASE_ROUTE + id}>
                  Edit
                </GreenButton>
                <GreenButton to={`/create-announcements/${id}`}>
                  Make Announcement
                </GreenButton>
                <RedButton to={Routes.DELETE_EVENT_BASE_ROUTE + id}>
                  Delete Event
                </RedButton>
                <GrayButton to={`${Routes.EVENT_BASE_ROUTE}${id}/rsvp`}>
                  View RSVP
                </GrayButton>
              </AdminActionButtonList>
            )}
            <EventDetails
              {...event}
              privilegeLevel={getPrivilegeLevel(tokens)}
              announcements={
                asyncRequestIsComplete(eventAnnouncements)
                  ? eventAnnouncements.result
                  : undefined
              }
              hasRegistered={hasRegistered}
            />
          </>
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
    tokens: state.authenticationState.tokens,
    events: state.eventsState.upcomingEvents,
    myEvents: state.myEventsState.myEvents,
    eventAnnouncements: state.eventAnnouncementsState.eventAnnouncements,
  };
};

export default connect(mapStateToProps)(SingleEvent);
