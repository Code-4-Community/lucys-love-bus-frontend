import React from 'react';
import styled from 'styled-components';
import { Card, Divider, Button } from 'antd';

// placeholder interface for now (will replace with real interface once hooked up to db)
interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
  otherNotes?: string;
  // TODO: use correct file type
  thumbnail?: string;
}

const StyledCard = styled(Card)`
  margin-bottom: 12px;
`; 

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const H1 = styled.h1`
  font-weight: bold;
`;

const H3 = styled.h1`
  margin-bottom: 2px;
`;

const ThinDivider = styled(Divider)`
  margin: 5px;
  width: 100%;
`;

const GreenButton = styled(Button)`
  color: white;
  background-color: #2d870d;
`;

const Thumbnail = styled.img`
  margin-right: 20px;
  width: 20%;
`;

const Info = styled.div`
  width: 80%;
`;

const EventListing: React.FC<{event: Event}> = ( props ) => {

  const defaultImg = 'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_2019_Sq_rgb+1.png';

  return (
      <StyledCard>
        <CardContent>
          <Thumbnail
            src={ props.event.thumbnail || defaultImg }>
          </Thumbnail>
          <Info>
            <H1>{ props.event.title }</H1>
            <h3>{ props.event.date }</h3>
            <ThinDivider />
            <h3>{ props.event.description }</h3>
            <GreenButton>Register</GreenButton>
          </Info>
        </CardContent>
      </StyledCard>
  );
};

export default EventListing;
