import { Card, Col, Row, Typography } from 'antd';
import { default as React, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import AnnouncementsList from '../../components/announcementsList';
import EventCard from '../../components/EventCard';
import { LinkButton } from '../../components/LinkButton';
import { NoContent } from '../../components/NoContent';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { ORANGE } from '../../utils/colors';
import { HOME_IMAGE } from '../../utils/copy';
import { getAnnouncements } from '../announcements/ducks/thunks';
import { AnnouncementsReducerState } from '../announcements/ducks/types';
import { getUpcomingEvents } from '../upcoming-events/ducks/thunks';
import {
  EventInformation,
  EventsReducerState,
} from '../upcoming-events/ducks/types';
import { PRIMARY_BREAKPOINT } from '../../utils/breakpoints';
const { Text, Paragraph } = Typography;

const LandingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LandingImage = styled.div`
  width: 100%;
  height: calc(95vh - 110px);
  object-fit: cover;
  background-image: url('${HOME_IMAGE}');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    height: 35vh;
  }
`;

const LandingText = styled(Text)`
  font-weight: 800;
  color: ${ORANGE};
  font-size: 36px;
  line-height: 48px;

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    font-size: 24px;
  }
`;

const LandingBodyText = styled(Paragraph)`
  font-size: 16px;

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    font-size: 14px;
  }
`;

const LandingTextContainer = styled.div`
  margin-bottom: 0.5em;
`;

const HomeContainer = styled.div`
  max-width: 1440px;
  display: block;
  margin: auto;
  padding: 24px;
`;

const CenterEventsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const UpcomingEventsTitle = styled(Text)`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 1em;
  margin-top: 1em;
  margin-right: 1em;
`;

const ViewMoreButton = styled(LinkButton)`
  margin: 1em;
`;

const AdminCol = styled(Col)`
  margin-right: 10px;
  margin-bottom: 16px;
`;

const CARD_ROW_LIMIT = 3;

export interface HomeContainerProps {
  events: EventsReducerState['upcomingEvents'];
  announcements: AnnouncementsReducerState['announcements'];
}

const Home: React.FC<HomeContainerProps> = ({ events, announcements }) => {
  const dispatch = useDispatch();
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  useEffect(() => {
    dispatch(getAnnouncements());
    dispatch(getUpcomingEvents());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const LandingCard = styled(Card)`
    position: absolute;
    top: 40%;
    left: 15%;
    width: ${privilegeLevel === PrivilegeLevel.ADMIN ? '600px' : '500px'};
    height: ${privilegeLevel === PrivilegeLevel.ADMIN ? '220px' : '280px'};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
      height: max-content;
      position: relative;
      width: 100%;
      left: 0%;
      justify-content: center;
      border-radius: 0px;
      box-shadow: none;
    }
  `;
  return (
    <>
      <Helmet>
        <title>Lucy's Love Bus Programs</title>
        <meta
          name="description"
          content="Register for Lucy's Love Bus events."
        />
      </Helmet>

      {privilegeLevel === PrivilegeLevel.ADMIN ? (
        <LandingContainer>
          <LandingImage />
          <LandingCard bordered={false}>
            <LandingTextContainer>
              <LandingText>Welcome Administrator!</LandingText>
            </LandingTextContainer>
            <LandingBodyText>
              Explore and use these tools to help create a space of hope and
              healing for the members of The Sajni Center.
            </LandingBodyText>
            <Row>
              <AdminCol>
                <LinkButton type="primary" to={Routes.CREATE_EVENT}>
                  Create Event
                </LinkButton>
              </AdminCol>
              <AdminCol>
                <LinkButton type="primary" to={'/create-announcements'}>
                  Make Announcement
                </LinkButton>
              </AdminCol>
              <AdminCol>
                <LinkButton type="primary" to={Routes.VIEW_REQUESTS}>
                  View Requests
                </LinkButton>
              </AdminCol>
            </Row>
          </LandingCard>
        </LandingContainer>
      ) : (
        <LandingContainer>
          <LandingImage />
          <LandingCard bordered={false}>
            <LandingTextContainer>
              <LandingText>
                Welcome to Lucy's Love Bus Event Registration!
              </LandingText>
            </LandingTextContainer>
            <LandingBodyText>
              The Sajni Center invites you to use this page as your portal to
              view and register for events, and stay up to date with our
              community!
            </LandingBodyText>
            <LinkButton type="primary" to="/upcoming-events">
              View Events
            </LinkButton>
          </LandingCard>
        </LandingContainer>
      )}
      <HomeContainer>
        <Row align="middle">
          <UpcomingEventsTitle>Upcoming Events</UpcomingEventsTitle>
          <ViewMoreButton to="upcoming-events">View All Events</ViewMoreButton>
        </Row>
        <Row>
          {asyncRequestIsFailed(events) && (
            <p>The events could not be retrieved.</p>
          )}
          {asyncRequestIsLoading(events) && <p>Loading events...</p>}
          {asyncRequestIsComplete(events) &&
            (events.result.length > CARD_ROW_LIMIT
              ? events.result.slice(0, CARD_ROW_LIMIT)
              : events.result
            ).map((event: EventInformation, i) => (
              <EventCard
                key={i}
                imageSrc={event.thumbnail}
                title={event.title}
                date={event.details.start}
                description={event.details.description}
                to={`/events/${event.id}`}
              />
            ))}
          {asyncRequestIsComplete(events) && events.result.length === 0 && (
            <CenterEventsContainer>
              <NoContent
                header={'There are currently no events!'}
                subheader={'Come back later for future updates!'}
              />
            </CenterEventsContainer>
          )}
        </Row>
        <Row align="middle">
          <UpcomingEventsTitle>Announcements</UpcomingEventsTitle>
          <ViewMoreButton to="announcements">
            View All Announcements
          </ViewMoreButton>
        </Row>
        {asyncRequestIsFailed(announcements) && (
          <p>The announcements could not be retrieved.</p>
        )}
        {asyncRequestIsLoading(announcements) && (
          <p>Loading announcements...</p>
        )}
        {asyncRequestIsComplete(announcements) && (
          <AnnouncementsList
            announcements={
              announcements.result.length > CARD_ROW_LIMIT
                ? announcements.result.slice(0, CARD_ROW_LIMIT)
                : announcements.result
            }
          />
        )}
      </HomeContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): HomeContainerProps => {
  return {
    announcements: state.announcementsState.announcements,
    events: state.eventsState.upcomingEvents,
  };
};

export default connect(mapStateToProps)(Home);
