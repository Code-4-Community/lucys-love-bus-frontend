import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ORANGE } from '../utils/colors';
import FormContainer from './FormContainer';
const { Title, Paragraph } = Typography;

const CenteredTitle = styled(Title)`
  text-align: center;
`;
const CenteredOrangeTitle = styled.h1`
  text-align: center;
  font-weight: 800;
  font-size: 2em;
  color: ${ORANGE};
`;
const CenteredParagraph = styled(Paragraph)`
  text-align: center;
`;

interface ConfirmationMessageProps {
  title: string;
  message: string;
  details: string;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  title,
  message,
  details,
}) => {
  return (
    <FormContainer>
      <CenteredTitle level={5}>{title}</CenteredTitle>
      <CenteredOrangeTitle>{message}</CenteredOrangeTitle>
      <CenteredParagraph>{details}</CenteredParagraph>
    </FormContainer>
  );
};

export default ConfirmationMessage;
