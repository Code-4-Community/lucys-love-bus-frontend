import { Card, Divider, Typography } from 'antd';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { DEFAULT_IMAGE } from '../utils/copy';
import { LinkButton } from './LinkButton';

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
  width: 400px;
  img {
    height: 250px;
    object-fit: cover;
  }
`;

const DateText = styled(Text)`
  font-size: 16px;
`;

interface EventsCardProps {
  imageSrc?: string;
  title: string;
  date: Date;
  description: string;
  to: string;
}

const EventsCardComponent: React.FC<EventsCardProps> = ({
  imageSrc,
  title,
  date,
  description,
  to,
}) => {
  return (
    <EventsCard cover={<img alt={title} src={imageSrc || DEFAULT_IMAGE} />}>
      <CardTitle>{title}</CardTitle>
      <br />
      <DateText strong>{dateFormat(date, 'longDate')}</DateText>
      <br />
      <DateText strong>{dateFormat(date, 'shortTime')}</DateText>
      <br />
      <CardDivider />

      <Paragraph ellipsis={{ rows: 3 }}>{description}</Paragraph>
      <LinkButton type="primary" to={to}>
        Learn More
      </LinkButton>
    </EventsCard>
  );
};
export default EventsCardComponent;
