import { Card, Divider, Typography } from 'antd';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
import { EventProps } from '../../containers/upcoming-events/ducks/types';
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

const EventListing: React.FC<EventProps> = ({
  id,
  thumbnail,
  title,
  details,
}) => {
  return (
    <StyledCard>
      <CardContent>
        <Thumbnail src={thumbnail || DEFAULT_IMAGE} />
        <Info>
          <Title level={3}>{title}</Title>
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
