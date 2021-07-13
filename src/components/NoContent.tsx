import { default as React } from 'react';
import styled from 'styled-components';
import { ORANGE } from '../utils/colors';

interface NoContentProps {
  header: string;
  subheader: string;
}

const NoContentContainer = styled.div`
  min-height: 300px;
`;

const NoContentSubText = styled.span`
  display: block;
  text-align: center;
`;

const NoContentText = styled(NoContentSubText)`
  color: ${ORANGE};
  font-size: 36px;
  font-weight: 800;
`;

export const NoContent: React.FC<NoContentProps> = ({ header, subheader }) => (
  <NoContentContainer>
    <NoContentText>{header}</NoContentText>
    <NoContentSubText>{subheader}</NoContentSubText>
  </NoContentContainer>
);
