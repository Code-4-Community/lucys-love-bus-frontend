import React, { useState } from 'react';
import { InputNumber, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { AsyncRequest, AsyncRequestKinds } from '../../../utils/asyncRequest';
import { TokenPayload } from '../../../auth/ducks/types';
import { C4CState } from '../../../store';
import { connect } from 'react-redux';
import protectedApiClient from '../../../api/protectedApiClient';
import { EventProps } from '../../../containers/upcoming-events/ducks/types';

interface EventRegistrationModalProps {
  eventId: number;
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
> = ({
  tokens,
  onCloseEventRegistrationModal,
  showEventRegistrationModal,
  eventId,
  eventTitle,
}) => {
  const [quantity, setQuantity] = React.useState<number>(0);

  const updateQuantity = (newValue: string | number | undefined) => {
    if (typeof newValue === 'number') {
      setQuantity(newValue);
    } else {
      setQuantity(0);
    }
  };

  const handleOk = (): void => {
    // TODO: if the user is a PF then register, otherwise redirect to stripe checkout (use the Redux global PrivilegeLevel)
    protectedApiClient.registerTickets({
      lineItemRequests: [
        {
          eventId,
          quantity,
        },
      ],
    });
    onCloseEventRegistrationModal();
  };
  return (
    <div>
      <StyledModal
        visible={showEventRegistrationModal}
        title={eventTitle}
        onOk={handleOk}
        okText={'Register'}
        onCancel={() => {
          onCloseEventRegistrationModal();
        }}
        width={'625px'}
      >
        <ContentDiv>
          <TicketInputNumber
            size="large"
            min={0}
            precision={0}
            value={quantity}
            placeholder="Number of Tickets"
            onChange={updateQuantity}
          />
        </ContentDiv>
      </StyledModal>
    </div>
  );
};

const mapStateToProps = (state: C4CState): StateProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(EventRegistrationModal);
