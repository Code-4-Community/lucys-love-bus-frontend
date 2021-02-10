import React from 'react';
import styled from 'styled-components';
import {Row, Button, Typography, Col} from 'antd';
import {EventProps} from '../../containers/upcoming-events/ducks/types';

const {Title} = Typography;

const TopRow = styled(Row)`
  margin-bottom: 12px;
  border: 1px solid #D9D9D9;
`;

const BottomRow = styled(Row)`
  display: flex;
  flex-direction: row;
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
  max-width: 100%;
  max-height: 400px;
`;

const Info = styled.div`
  margin-left: 40px;
  max-height: 350px;
`;

const AnnoucementBox = styled.div`
  align-items: center;
  border: 1px solid #D9D9D9;
  min-height: 80px;
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
            <Col span={14}>
              <Thumbnail src={thumbnail || defaultImg}></Thumbnail>
            </Col>
            <Col span={10}>
              <Info>
                <StyledTitle level={3}>{title}</StyledTitle>
                <div>{dateFormat(date, 'dddd, mmmm dS, yyyy')}</div>
                <Time>{time}</Time>
                <Location>Location: {location}</Location>
                <GreenButton>Register</GreenButton>
              </Info>
            </Col>
          </CardContent>
        </TopRow>
        <BottomRow>
            <Col span={14}>
                <Title level={5}>Description</Title>
                <Typography>{description}</Typography>
                <Title level={5}>Other Notes</Title>
                <Typography>{otherNotes}</Typography>
                <GreenButton>Register</GreenButton>
            </Col>
            <Col span={10}>
                <Title level={5}>Announcements</Title>
              <AnnoucementBox>
                  There are no annoucements for this event
              </AnnoucementBox>
            </Col>
        </BottomRow>
      </>

  );
};

export default EventListing;
