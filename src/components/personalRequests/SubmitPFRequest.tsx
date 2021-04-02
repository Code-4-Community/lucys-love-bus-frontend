import React from 'react';
import styled from 'styled-components';
import Paragraph from 'antd/lib/typography/Paragraph';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import ProtectedApiClient from '../../api/protectedApiClient';
import { ORANGE, DEEP_GREEN } from '../../utils/colors';

export interface SubmitPFRequestProps {
  onNewRequest: () => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const RequestsContainer = styled.div`
  padding: 30px;
  border: 2px solid black;
  border-radius: 3px;
  text-align: center;
  width: 50%;
`;

const StyledButton = styled(Button)`
  background-color: ${DEEP_GREEN};
  color: white;
  padding: 0px 30px;
  margin: 20px 0px;
`;

const StyledText = styled(Paragraph)`
  font-size: 18px;
  margin-bottom: 0px !important;
`;

const StyledHeader = styled(StyledText)`
  font-weight: bold;
  margin-bottom: 30px !important;
`;

const StepText = styled.span`
  font-weight: bold;
  color: ${ORANGE};
`;

export const SubmitPFRequest: React.FC<SubmitPFRequestProps> = ({
  onNewRequest,
}) => {
  const history = useHistory();

  const onApplyToBePF = () => {
    ProtectedApiClient.makePFRequest();
    onNewRequest();
  };

  return (
    <Wrapper>
      <RequestsContainer>
        <StyledHeader>
          Submit a Request to Become a Participating Family
        </StyledHeader>
        <StyledText>
          <StepText>Step 1: </StepText>
          Add your family information by editing your account details. This will
          act as your application.
        </StyledText>
        <StyledButton onClick={() => history.push(Routes.EDIT_FAMILY_INFO)}>
          Edit Account Details
        </StyledButton>
        <StyledText>
          <StepText>Step 2: </StepText>
          Once your information is up to date, you can apply to become a
          participating family by clicking the button below. Your request will
          be reviewed by an LLB admin.
        </StyledText>
        <StyledButton onClick={() => onApplyToBePF()}>
          Submit Application
        </StyledButton>
      </RequestsContainer>
    </Wrapper>
  );
};
