import React, { useState } from 'react';
import { InputNumber, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { AsyncRequest, AsyncRequestKinds } from '../../../utils/asyncRequest';
import { TokenPayload } from '../../../auth/ducks/types';
interface EventRegistrationModalProps {
  eventTitle: string;
  showEventRegistrationModal: boolean;
  onCloseEventRegistrationModal: () => void;
}
interface StateProps {
  tokens: AsyncRequest<TokenPayload, any>;
}
const StyledModal = styled(Modal)`
  horiz-align: center;
`;
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const TicketInputNumber = styled(InputNumber)`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 272px;
`;

const EventRegistrationModal: React.FC<
  EventRegistrationModalProps & StateProps
> = ({ tokens, onCloseEventRegistrationModal, showEventRegistrationModal }) => {
  const handleOk = (): void => {
    showEventRegistrationModal = false;
  };
  return (
    <div>
      <StyledModal
        visible={showEventRegistrationModal}
        title={'TITLE'}
        onOk={handleOk}
        okText={'Register'}
        onCancel={() => {
          onCloseEventRegistrationModal();
        }}
        width={'625px'}
      >
        <ContentDiv>
          <TicketInputNumber size="large" placeholder="Number of Tickets" />
        </ContentDiv>
      </StyledModal>
    </div>
  );
};

export default EventRegistrationModal;
