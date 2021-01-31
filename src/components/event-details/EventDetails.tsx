import React from 'react';
import styled from 'styled-components';
import { Row, Button, Typography } from 'antd';
import { EventProps } from '../../containers/upcoming-events/ducks/types';
const { Title } = Typography;

const TopRow = styled(Row)`
  margin-bottom: 12px;
  border: 1px solid #D9D9D9;
`;

const BottomRow = styled(Row)`
  display: flex;
  margin-bottom: 12px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled(Title)`
  margin-top: 15px;
`

const Time = styled.div`
  margin-bottom: 20px;
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
  margin-right: 40px;
  width: 60%;
  max-height: 350px;
`;

const Info = styled.div`
  margin-right: 40px;
  width: 60%;
  max-height: 350px;
`;

const LeftColumn = styled.div`
  width: 40%;
`;

const EventListing: React.FC<EventProps> = ({
                                              thumbnail,
                                              title,
                                              date,
                                              time,
                                              description,
                                              location,
                                              otherNotes,
                                            }) => {
  const defaultImg =
      'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_2019_Sq_rgb+1.png';
  const dateFormat = require('dateformat');

  return (
      <>
        <TopRow>
          <CardContent>
            <Thumbnail src={thumbnail || defaultImg}></Thumbnail>
            <LeftColumn>
              <StyledTitle level={3}>{title}</StyledTitle>
              <div>{dateFormat(date, 'dddd, mmmm dS, yyyy')}</div>
              <Time>{time}</Time>
              <Location>Location: {location}</Location>
              <GreenButton>Register</GreenButton>
            </LeftColumn>
          </CardContent>
        </TopRow>
        <BottomRow>
          <CardContent>
            <Info>
              <Title level={5}>Description</Title>
              <Typography>{description}</Typography>
              <Title level={5}>Other Notes</Title>
              <Typography>{otherNotes}</Typography>
              <GreenButton>Register</GreenButton>
            </Info>
            <LeftColumn>
              <StyledTitle level={5}>Announcements</StyledTitle>
            </LeftColumn>
          </CardContent>
        </BottomRow>
      </>

  );
};

export default EventListing;
