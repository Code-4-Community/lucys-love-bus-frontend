import React from 'react';
import ConfirmationMessage from '../components/ConfirmationMessage';
import { ContactInfo } from '../containers/setContacts/ducks/types';
import { Button, Typography } from 'antd';
import { Routes } from '../App';
import styled from 'styled-components';
import { ChungusContentContainer } from './index';

const { Paragraph } = Typography;

const StyledDiv = styled.div`
  outline: 1px solid black;
  width: 30%;
  margin-left: 35%;
`;

const StyledParagraph = styled(Paragraph)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 2%;
  width: 6%;
  margin-left: 47%;
`;

interface DecisionConfirmationProps {
  readonly approved: boolean;
  readonly contactInformation: ContactInfo;
}

const DecisionConfirmation: React.FC<DecisionConfirmationProps> = ({
  approved,
  contactInformation,
}) => {
  const message = `The ${
    contactInformation.mainContact.lastName
  } family has been ${approved ? 'approved!' : 'denied'}`;
  const details = approved
    ? 'An email to congratulate the new Participating Family is on its way. ' +
      'Use the account owner’s details below for additional communications.'
    : 'Is more information needed? Did you spot a mistake? ' +
      'Use the account owner’s details below to reach out and clarify, or inquire.';

  return (
    <ChungusContentContainer>
      <ConfirmationMessage
        title="DECISION CONFIRMATION"
        message={message}
        details={details}
      />
      <StyledDiv>
        <StyledParagraph>
          <strong>First Name: </strong>
          {contactInformation.mainContact.firstName}
          <br />
          <strong>Last Name: </strong>
          {contactInformation.mainContact.lastName}
          <br />
          <strong>Email: </strong>
          {contactInformation.mainContact.email}
        </StyledParagraph>
      </StyledDiv>
      <StyledButton href={Routes.VIEW_REQUESTS} type="primary">
        Done
      </StyledButton>
    </ChungusContentContainer>
  );
};

export default DecisionConfirmation;
