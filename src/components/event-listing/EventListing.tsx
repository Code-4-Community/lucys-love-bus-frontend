import { Card, Divider, Tag, Typography } from 'antd';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
import { EventInformation } from '../../containers/upcoming-events/ducks/types';
import { DEFAULT_IMAGE } from '../../utils/copy';

const { Title, Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 32px;
  height: 314px;
  .ant-card-body {
    padding: 0px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const ThinDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
`;

const GreenButton = styled(LinkButton)`
  color: white;
  background-color: #2d870d;
`;

const Thumbnail = styled.img`
  width: 33%;
  object-fit: cover;
  height: 312px;
`;

const Info = styled.div`
  padding: 24px;
  width: 67%;
`;

const InlineTitle = styled(Title)`
  display: inline;
`;

const EventTag = styled(Tag)`
  margin: 1em;
`;

const EventListing: React.FC<EventInformation> = ({
  id,
  thumbnail,
  title,
  details,
  ticketCount,
}) => {
  return (
    <StyledCard>
      <CardContent>
        <Thumbnail src={thumbnail || DEFAULT_IMAGE} />
        <Info>
          <InlineTitle level={3}>{title}</InlineTitle>
          {ticketCount && (
            <>
              <EventTag color="green">
                Registered {ticketCount} tickets
              </EventTag>
            </>
          )}
          <br />
          <Text strong>{dateFormat(details.start, 'longDate', true)}</Text>
          <br />
          <Text strong>{dateFormat(details.start, 'shortTime', true)}</Text>
          <ThinDivider />
          <Paragraph ellipsis={{ rows: 5 }}>{details.description}</Paragraph>
          <GreenButton to={`/events/${id}`}>Register</GreenButton>
        </Info>
      </CardContent>
    </StyledCard>
  );
};

export default EventListing;
