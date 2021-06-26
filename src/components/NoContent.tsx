import { default as React, useState } from 'react';
import styled from 'styled-components';
import { LIGHT_GREY, LINK, ORANGE } from '../utils/colors';

interface NoContentProps {
  header: string;
  subheader: string;
}

const NoAnnouncementsContainer = styled.div`
  min-height: 300px;
`;

const NoAnnouncementsSubText = styled.span`
  display: block;
  text-align: center;
`;

const NoAnnouncementsText = styled(NoAnnouncementsSubText)`
  color: ${ORANGE};
  font-size: 36px;
  font-weight: 800;
`;

export const NoContent: React.FC<NoContentProps> = ({ header, subheader }) => (
  <NoAnnouncementsContainer>
    <NoAnnouncementsText>{header}</NoAnnouncementsText>
    <NoAnnouncementsSubText>{subheader}</NoAnnouncementsSubText>
  </NoAnnouncementsContainer>
);
