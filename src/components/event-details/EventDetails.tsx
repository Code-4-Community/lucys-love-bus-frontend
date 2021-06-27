import { Button, Col, Row, Tag, Typography } from 'antd';
import dateFormat from 'dateformat';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { EventAnnouncement } from '../../containers/singleEvent/ducks/types';
import { EventInformation } from '../../containers/upcoming-events/ducks/types';
import { DEFAULT_IMAGE } from '../../utils/copy';
import { AnnouncementCard } from '../AnnouncementCard';
import EventRegistrationModal from '../modals/event-registration-modal/EventRegistrationModal';
const { Title } = Typography;

const TopRow = styled(Row)`
  margin-bottom: 12px;
  border: 1px solid #d9d9d9;
`;

const BottomRow = styled(Row)`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled(Title)`
  display: inline;
  margin-top: 15px;
`;

const Time = styled.div`
  margin-bottom: 0.5em;
`;

const SeatsRemaining = styled.div`
  margin-bottom: 0.5em;
`;

const Location = styled.div`
  margin-bottom: 120px;
`;

const GreenButton = styled(Button)`
  color: white;
  background-color: #2d870d;
  margin-bottom: 15px;
`;

const Thumbnail = styled.img`
  max-width: 100%;
  height: 400px;
  object-fit: cover;
`;

const EventsTag = styled(Tag)`
  margin: 1em;
`;

const Info = styled.div`
  margin-left: 40px;
  max-height: 350px;
`;

const AnnouncementBox = styled.div``;

const AnnouncementNoContent = styled(AnnouncementBox)``;

export interface EventDetailsProps extends EventInformation {
  announcements?: EventAnnouncement[];
  privilegeLevel: PrivilegeLevel;
  hasRegistered: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  thumbnail,
  id,
  title,
  details,
  privilegeLevel,
  announcements,
  hasRegistered,
  ticketCount,
  spotsAvailable,
}) => {
  const [
    displayEventRegistrationModal,
    setDisplayEventRegistrationModal,
  ] = useState<boolean>(false);

  const { description, privateDescription, location, start, end } = details;

  const computeDateString = () => {
    const startDate = dateFormat(start, 'longDate');
    const endDate = dateFormat(end, 'longDate');
    const startTime = dateFormat(start, 'shortTime');
    const endTime = dateFormat(end, 'shortTime');
    return startDate === endDate ? (
      <>
        <Time>{startDate}</Time>
        <Time>
          {startTime} - {endTime}
        </Time>
      </>
    ) : (
      <Time>
        {startDate}, {startTime} - {endDate}, {endTime}
      </Time>
    );
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name={title} content={details.description} />
      </Helmet>
      <TopRow>
        <CardContent>
          <Col span={14}>
            <Thumbnail src={thumbnail || DEFAULT_IMAGE}></Thumbnail>
          </Col>
          <Col span={10}>
            <Info>
              <StyledTitle level={3}>{title}</StyledTitle>
              {ticketCount && (
                <EventsTag color={'green'}>
                  Registered {ticketCount} tickets
                </EventsTag>
              )}
              {computeDateString()}
              <SeatsRemaining>Seats Remaining: {spotsAvailable}</SeatsRemaining>
              <Location>Location: {location}</Location>
              <GreenButton
                onClick={() => {
                  setDisplayEventRegistrationModal(true);
                }}
              >
                {hasRegistered ? 'Update Registration' : 'Register'}
              </GreenButton>
            </Info>
          </Col>
        </CardContent>
      </TopRow>
      <BottomRow gutter={[24, 24]}>
        <Col span={14}>
          <Title level={5}>Description</Title>
          <Typography>{description}</Typography>
          {privateDescription !== undefined && (
            <>
              <Title level={5}>Private Description</Title>
              <Typography>{privateDescription}</Typography>
            </>
          )}
        </Col>
        <Col span={10}>
          {announcements && (
            <>
              {announcements.length ? (
                <AnnouncementBox>
                  <Title level={5}>Updates for this Event</Title>
                  {announcements.map((announcement, i) => {
                    return (
                      <AnnouncementCard {...announcement} key={i} condensed />
                    );
                  })}
                </AnnouncementBox>
              ) : (
                <>
                  <Title level={5}>Updates for this Event</Title>
                  <AnnouncementNoContent>
                    There are no announcements for this event
                  </AnnouncementNoContent>
                </>
              )}
            </>
          )}
        </Col>
      </BottomRow>
      <EventRegistrationModal
        eventId={id}
        eventTitle={title}
        privilegeLevel={privilegeLevel}
        showEventRegistrationModal={displayEventRegistrationModal}
        onCloseEventRegistrationModal={() => {
          setDisplayEventRegistrationModal(false);
        }}
        hasRegistered={hasRegistered}
        ticketCount={ticketCount}
      />
    </>
  );
};

export default EventDetails;
