import { Button, Col, Row, Typography } from 'antd';
import dateFormat from 'dateformat';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import EventRegistrationModal from '../modals/event-registration-modal/EventRegistrationModal';
import { DEFAULT_IMAGE } from '../../utils/copy';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { EventAnnouncement } from '../../containers/singleEvent/ducks/types';
import { AnnouncementCard } from '../AnnouncementCard';
import { EventInformation } from '../../containers/upcoming-events/ducks/types';
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
  margin-top: 15px;
`;

const Time = styled.div`
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
  max-height: 400px;
`;

const Info = styled.div`
  margin-left: 40px;
  max-height: 350px;
`;

const AnnouncementBox = styled.div`
  padding: 15px;
`;

const AnnouncementNoContent = styled(AnnouncementBox)`
  border: 1px solid black;
  text-align: center;
`;

export interface EventDetailsProps extends EventInformation {
  announcements?: EventAnnouncement[];
  privilegeLevel: PrivilegeLevel;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  thumbnail,
  id,
  title,
  details,
  privilegeLevel,
  announcements,
}) => {
  const [
    displayEventRegistrationModal,
    setDisplayEventRegistrationModal,
  ] = useState<boolean>(false);

  const { description, location, start, end } = details;

  const computeDateString = (startDate: Date) => {
    const fullDate = dateFormat(startDate, 'fullDate');

    return fullDate;
  };

  const computeTimeString = (startDate: Date, endDate: Date) => {
    const startTime = dateFormat(startDate, 'shortTime');
    const endTime = dateFormat(endDate, 'shortTime');

    return `${startTime} - ${endTime}`;
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
              <Time>{computeDateString(start)}</Time>
              <Time>{computeTimeString(start, end)}</Time>

              <Location>Location: {location}</Location>
              <GreenButton
                onClick={() => {
                  setDisplayEventRegistrationModal(true);
                }}
              >
                Register
              </GreenButton>
            </Info>
          </Col>
        </CardContent>
      </TopRow>
      <BottomRow>
        <Col span={14}>
          <Title level={5}>Description</Title>
          <Typography>{description}</Typography>
        </Col>
        <Col span={10}>
          {announcements && (
            <>
              {announcements.length ? (
                <AnnouncementBox>
                  <Title level={5}>Updates for this Event</Title>
                  {announcements.map((announcement, i) => {
                    return (
                      <AnnouncementCard
                        key={i}
                        imageSrc={announcement.imageSrc}
                        title={announcement.title}
                        created={announcement.created}
                        description={announcement.description}
                      />
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
      />
    </>
  );
};

export default EventDetails;
