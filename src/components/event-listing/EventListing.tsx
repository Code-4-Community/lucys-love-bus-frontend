import React from 'react';
import styled from 'styled-components';
import { Card, Divider, Button, Typography } from 'antd';
import { EventProps } from '../../containers/upcoming-events/ducks/types';
import dateFormat from 'dateformat';

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

const GreenButton = styled(Button)`
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
  src,
  title,
  date,
  description,
}) => {
  const defaultImg =
    'https://today.tamu.edu/wp-content/uploads/2019/03/GettyImages-184621282.jpg';

  return (
    <StyledCard>
      <CardContent>
        <Thumbnail src={src || defaultImg}></Thumbnail>
        <Info>
          <Title level={3}>{title}</Title>
          <Text strong>{dateFormat(date, 'longDate')}</Text>
          <br />
          <Text strong>{dateFormat(date, 'shortTime')}</Text>
          <ThinDivider />
          <Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph>
          <GreenButton>Register</GreenButton>
        </Info>
      </CardContent>
    </StyledCard>
  );
};

export default EventListing;
