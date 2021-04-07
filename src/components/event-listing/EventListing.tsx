import { Card, Divider, Typography } from 'antd';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../../components/LinkButton';
import { EventProps } from '../../containers/upcoming-events/ducks/types';
import { DEFAULT_IMAGE } from '../../utils/copy';

const { Title, Text, Paragraph } = Typography;

const BASE_EVENTS_ROUTE = '/events/';

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

const StyledButton = styled(LinkButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 16px;
  padding: 8px 16px;
`;

const GreenButton = styled(StyledButton)`
  color: white;
  background-color: #2d870d;
`;

const GrayButton = styled(StyledButton)`
  background-color: white;
  color: #595959;

  &:hover {
    border-color: #595959;
    color: white;
    background-color: #595959;
  }

  &:focus {
    background-color: white;
    color: #595959;
    border-color: #595959;
  }
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

const AdminButtonWrapper = styled.div`
  display: flex;
`;

interface EventListingProps extends EventProps {
  admin?: boolean;
}

const EventListing: React.FC<EventListingProps> = ({
  id,
  thumbnail,
  title,
  details,
  admin,
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
          {admin ? (
            <AdminButtonWrapper>
              <GreenButton to={BASE_EVENTS_ROUTE + id}>Register</GreenButton>
              <GreenButton to={BASE_EVENTS_ROUTE + id}>Edit</GreenButton>
              <GreenButton to={BASE_EVENTS_ROUTE + id}>
                Make Announcement
              </GreenButton>
              <GrayButton to={BASE_EVENTS_ROUTE + id}>View RSVP</GrayButton>
            </AdminButtonWrapper>
          ) : (
            <GreenButton to={BASE_EVENTS_ROUTE + id}>Register</GreenButton>
          )}
        </Info>
      </CardContent>
    </StyledCard>
  );
};

export default EventListing;
