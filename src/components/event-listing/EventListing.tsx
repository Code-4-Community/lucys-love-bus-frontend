import {Card, Divider, Tag, Typography} from 'antd';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
import { EventInformation } from '../../containers/upcoming-events/ducks/types';

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

const EventListing: React.FC<EventInformation> = ({
  id,
  thumbnail,
  title,
  details,
}) => {
  const defaultImg =
    'https://today.tamu.edu/wp-content/uploads/2019/03/GettyImages-184621282.jpg';

  return (
    <StyledCard>
      <CardContent>
        <Thumbnail src={thumbnail || defaultImg} />
        <Info>
          <Title level={3}>{title}</Title>
          <Tag color="green">green</Tag>
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
