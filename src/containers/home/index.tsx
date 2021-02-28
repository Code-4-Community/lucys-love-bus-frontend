import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, Col, Row, Typography } from 'antd';
import styled from 'styled-components';
import { ORANGE } from '../../utils/colors';
import { LinkButton } from '../../components/LinkButton';
import EventCard from '../../components/EventCard';
import AnnouncementsList from '../../components/announcements-list/AnnouncementsList';
const { Text, Paragraph } = Typography;
const image1v2 =
  'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/sajni+center+thiago+music(1).jpg';

const LandingContainer = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  object-fit: cover;
  background-image: url('${image1v2}');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
`;
const LandingCard = styled(Card)`
  position: relative;
  top: 30%;
  left: 15%;
  width: 500px;
  height: 280px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

const LandingText = styled(Text)`
  font-weight: 800;
  color: ${ORANGE};
  font-size: 36px;
  line-height: 48px;
`;

const LandingBodyText = styled(Paragraph)`
  font-size: 16px;
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

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Lucy's Love Bus Event Registration</title>
        <meta
          name="description"
          content="Register for Lucy's Love Bus events."
        />
      </Helmet>

      <LandingContainer>
        <LandingCard bordered={false}>
          <LandingTextContainer>
            <LandingText>
              Welcome to Lucy's Love Bus Event Registration!
            </LandingText>
          </LandingTextContainer>
          <LandingBodyText>
            The Sajni Center invites you to use this page as your portal to view
            and register for events, and stay up to date with our community!
          </LandingBodyText>
          <LinkButton type="primary" to="/upcoming-events">
            View Events
          </LinkButton>
        </LandingCard>
      </LandingContainer>
      <HomeContainer>
        <Row align="middle">
          <UpcomingEventsTitle>Upcoming Events</UpcomingEventsTitle>
          <ViewMoreButton to="upcoming-events">View All Events</ViewMoreButton>
        </Row>
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <EventCard
              src="https://www.pets4homes.co.uk/images/classifieds/2013/07/16/362464/large/beautiful-two-cats-bengal-x-british-shorthair-51f9b081db1b2.jpg"
              title="VIRTUAL Slow Flow Restorative Yoga"
              date={new Date()}
              description={`Find some time for self-care and join yoga teacher Sarah Oleson
              for a peaceful and rejuvenating virtual. Find some time for self-care and join yoga teacher Sarah Oleson
              for a peaceful and rejuvenating virtual. Find some time for self-care and join yoga teacher Sarah Oleson
              for a peaceful and rejuvenating virtual.`}
              to="/"
            />
          </Col>
          <Col>
            <EventCard
              src="http://thewowstyle.com/wp-content/uploads/2015/04/6891272-cats.jpg"
              title="VIRTUAL Slow Flow Restorative Yoga"
              date={new Date()}
              description={`Find some time for self-care and join yoga teacher Sarah Oleson
              for a peaceful and rejuvenating virtual...`}
              to="/"
            />
          </Col>
          <Col>
            <EventCard
              src="https://americanhumane.org/app/uploads/2016/08/animals-cats-cute-45170-min.jpg"
              title="VIRTUAL Slow Flow Restorative Yoga"
              date={new Date()}
              description={`Find some time for self-care and join yoga teacher Sarah Oleson
              for a peaceful and rejuvenating virtual...`}
              to="/"
            />
          </Col>
        </Row>
        <Row align="middle">
          <UpcomingEventsTitle>Announcements</UpcomingEventsTitle>
          <ViewMoreButton to="announcements">
            View All Announcements
          </ViewMoreButton>
        </Row>
        <AnnouncementsList limit={3} />
      </HomeContainer>
    </>
  );
};

export default Home;
