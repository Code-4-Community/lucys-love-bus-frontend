import { Divider, Card, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { LinkButton } from './LinkButton';
import dateFormat from 'dateformat';

const { Text, Paragraph } = Typography;
const CardTitle = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;
const CardDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const EventsCard = styled(Card)`
  height: fit-content;
  min-width: 200px;
  max-width: 400px;
  img {
    height: 250px;
    object-fit: cover;
  }
`;

const DateText = styled(Text)`
  font-size: 16px;
`;

interface EventsCardProps {
  src: string;
  title: string;
  date: Date;
  description: string;
  to: string;
}

const EventsCardComponent: React.FC<EventsCardProps> = ({
  src,
  title,
  date,
  description,
  to,
}) => {
  return (
    <EventsCard cover={<img alt="example" src={src} />}>
      <CardTitle>{title}</CardTitle>
      <br />
      <DateText strong>{dateFormat(date, 'longDate')}</DateText>
      <br />
      <DateText strong>{dateFormat(date, 'shortTime')}</DateText>
      <br />
      <CardDivider />

      <Paragraph ellipsis={{ rows: 3 }}>{description}</Paragraph>
      <LinkButton type="primary" to={to}>
        Register
      </LinkButton>
    </EventsCard>
  );
};
export default EventsCardComponent;