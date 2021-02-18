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

const AnnoucementsCard = styled(Card)`
  height: fit-content;
  min-width: 200px;
  max-width: 400px;
  img {
    height: 250px;
    object-fit: cover;
  }
`;
const AnnoucementsCardNoCover = styled(Card)`
  height: 100%;
  min-width: 200px;
  max-width: 400px;
`;
const DateText = styled(Text)`
  font-size: 16px;
`;

interface AnnoucementsCardProps {
  src?: string;
  title: string;
  date: Date;
  description: string;
  // to: string; annoucements will eventually need to link to an individual annoucement, for now I am purposefully leaving this out for simplicity
}

const EventsCardComponent: React.FC<AnnoucementsCardProps> = ({
  src,
  title,
  date,
  description,
}) => {
  return src ? (
    <AnnoucementsCard cover={<img alt="example" src={src} />}>
      <DateText strong>{dateFormat(date, 'longDate')}</DateText>
      <br />

      <CardTitle>{title}</CardTitle>
      <br />

      <Paragraph ellipsis={{ rows: 3 }}>{description}</Paragraph>
    </AnnoucementsCard>
  ) : (
    <AnnoucementsCardNoCover>
      <DateText strong>{dateFormat(date, 'longDate')}</DateText>
      <br />

      <CardTitle>{title}</CardTitle>
      <br />

      <Paragraph ellipsis={{ rows: 3 }}>{description}</Paragraph>
    </AnnoucementsCardNoCover>
  );
};
export default EventsCardComponent;