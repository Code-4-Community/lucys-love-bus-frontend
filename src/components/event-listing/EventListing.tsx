import { Card, Divider, Tag, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import dateFormat from 'dateformat';
import React from 'react';
import styled from 'styled-components';
import { Routes } from '../../App';
import { LinkButton } from '../../components/LinkButton';
import { EventInformation } from '../../containers/upcoming-events/ducks/types';
import { DEFAULT_IMAGE } from '../../utils/copy';
import { PRIMARY_BREAKPOINT } from '../../utils/breakpoints';

const { Text, Paragraph } = Typography;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const ThinDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    display: none;
  }
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

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    width: 45%;
    height: 214px;
  }
`;

const Info = styled.div`
  padding: 24px;
  width: 67%;
`;

const InlineTitle = styled(Text)`
  font-size: 24px;
  display: inline;

  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    font-size: 32px;
    font-weight: bold;
  }
`;

const EventTag = styled(Tag)`
  margin: 1em;
`;

const AdminButtonWrapper = styled.div`
  display: flex;
`;

const BottomHalfWrapper = styled.div`
  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    display: none;
  }
`;

const DateText = styled(Text)`
  @media screen and (max-width: ${PRIMARY_BREAKPOINT}) {
    font-size: 16px;
  }
`;

interface EventListingProps extends EventInformation {
  admin?: boolean;
}

const EventListing: React.FC<EventListingProps> = ({
  id,
  thumbnail,
  title,
  details,
  ticketCount,
  admin,
}) => {
  const history = useHistory();
  const onMobile = useMediaQuery({
    query: '(max-width: ' + PRIMARY_BREAKPOINT + ')',
  });

  const handleMobileOnClick = () => {
    onMobile && history.push(Routes.EVENT_BASE_ROUTE + id);
  };

  const StyledCard = styled(Card)`
    margin-bottom: 32px;
    height: ${onMobile ? '216px' : '314px'};
    .ant-card-body {
      padding: 0px;
    }
    cursor: ${onMobile && `pointer`};
  `;

  return (
    <StyledCard onClick={handleMobileOnClick}>
      <CardContent>
        <Thumbnail src={thumbnail || DEFAULT_IMAGE} />
        <Info>
          <InlineTitle>{title}</InlineTitle>
          {ticketCount && (
            <>
              <EventTag color="green">
                Registered {ticketCount} tickets
              </EventTag>
            </>
          )}
          <br />
          <DateText strong>{dateFormat(details.start, 'longDate')}</DateText>
          <br />
          <DateText strong>{dateFormat(details.start, 'shortTime')}</DateText>
          <ThinDivider />
          <BottomHalfWrapper>
            <Paragraph ellipsis={{ rows: 5 }}>{details.description}</Paragraph>
            {admin ? (
              <AdminButtonWrapper>
                <GreenButton to={Routes.EVENT_BASE_ROUTE + id}>
                  Learn More
                </GreenButton>
                <GreenButton to={Routes.EDIT_EVENT_BASE_ROUTE + id}>
                  Edit
                </GreenButton>
                <GreenButton to={`/create-announcements/${id}`}>
                  Make Announcement
                </GreenButton>
                <GrayButton to={`${Routes.EVENT_BASE_ROUTE}${id}/rsvp`}>
                  View RSVP
                </GrayButton>
              </AdminButtonWrapper>
            ) : (
              <GreenButton to={Routes.EVENT_BASE_ROUTE + id}>
                Learn More
              </GreenButton>
            )}
          </BottomHalfWrapper>
        </Info>
      </CardContent>
    </StyledCard>
  );
};

export default EventListing;
