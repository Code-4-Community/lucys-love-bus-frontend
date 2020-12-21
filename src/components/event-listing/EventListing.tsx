import React from 'react';
import styled from 'styled-components';
import { Card, Divider, Button, Typography } from 'antd';
import { EventProps }  from '../../containers/upcoming-events/ducks/types'
const { Title, Text, Paragraph } = Typography;


const StyledCard = styled(Card)`
  margin-bottom: 12px;
`; 

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const EventListing: React.FC<EventProps> = ( { thumbnail, title, date, description } ) => {

  const defaultImg = 'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_2019_Sq_rgb+1.png';

  return (
      <StyledCard>
        <CardContent>
          <Thumbnail
            src={ thumbnail || defaultImg }>
          </Thumbnail>
          <Info>
            <Title level={3}>{ title }</Title>
            <Text>{ date }</Text>
            <ThinDivider />
            <Paragraph>{ description }</Paragraph>
            <GreenButton>Register</GreenButton>
          </Info>
        </CardContent>
      </StyledCard>
  );
};

export default EventListing;