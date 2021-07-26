import { Button, Tag, Typography } from 'antd';
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

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  text-align: left;
  margin-bottom: 16px;
  height: min-content;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const AnnouncementsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #d9d9d9;
  width: 100%;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
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

  @media screen and (max-width: 900px) {
    margin-bottom: 40px;
  }
`;

const GreenButton = styled(Button)`
  color: white;
  background-color: #2d870d;
  margin-bottom: 15px;
`;

const Thumbnail = styled.img`
  display: flex;
  object-fit: cover;
  width: 100%;
`;

const EventsTag = styled(Tag)`
  margin: 1em;
`;

const Info = styled.div``;

const CardWrapper = styled.div`
  margin-bottom: 12px;
  width: 100%;
  display: flex;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  max-width: 65%;
  width: 55%;
  min-height: 400px;
  max-height: 500px;
  justify-content: left;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    min-width: 100%;
    justify-content: center;
    margin-bottom: 16px;
    min-height: 200px;
    max-height: 300px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 45%;
  padding: 0px 20px;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const DescriptionTitle = styled(Title)`
  width: 100%;
`;

const AnnouncementsTitle = styled(Title)`
  width: 100%;
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

  const { description, location, start, end } = details;

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
      <CardWrapper>
        <CardContent>
          <ThumbnailWrapper>
            <Thumbnail src={thumbnail || DEFAULT_IMAGE}></Thumbnail>
          </ThumbnailWrapper>
          <InfoWrapper>
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
          </InfoWrapper>
        </CardContent>
      </CardWrapper>
      <BottomWrapper>
        <DescriptionWrapper>
          <DescriptionTitle level={5}>Description</DescriptionTitle>
          <Typography>{description}</Typography>
        </DescriptionWrapper>
        <AnnouncementsWrapper>
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
                  <AnnouncementsTitle level={5}>
                    Updates for this Event
                  </AnnouncementsTitle>
                  <AnnouncementNoContent>
                    There are no announcements for this event
                  </AnnouncementNoContent>
                </>
              )}
            </>
          )}
        </AnnouncementsWrapper>
      </BottomWrapper>
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
