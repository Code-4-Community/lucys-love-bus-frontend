import React from 'react';
import { Alert, InputNumber, Modal, Typography } from 'antd';
import styled from 'styled-components';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../../utils/asyncRequest';
import { PrivilegeLevel } from '../../../auth/ducks/types';
import protectedApiClient from '../../../api/protectedApiClient';

const { Text } = Typography;

interface EventRegistrationModalProps {
  eventId: number;
  eventTitle: string;
  privilegeLevel: PrivilegeLevel;
  showEventRegistrationModal: boolean;
  onCloseEventRegistrationModal: () => void;
}

const StyledModal = styled(Modal)`
  horiz-align: center;
`;

const ContentDiv = styled.div`
  display: block;
  margin: auto;
  padding-left: 25%;
  padding-right: 25%;
  flex-direction: column;
  justify-content: center;
`;

const TicketInputNumber = styled(InputNumber)`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const LeftAlignedText = styled(Text)`
  display: block;
  text-align: left;
`;

const BoldCenterText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

const AlertWithMargin = styled(Alert)`
  margin-bottom: 20px;
`;

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  eventId,
  eventTitle,
  privilegeLevel,
  onCloseEventRegistrationModal,
  showEventRegistrationModal,
}) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [registrationRequest, setRegistrationRequest] = React.useState<
    AsyncRequest<void, any>
  >(AsyncRequestNotStarted());

  const updateQuantity = (newValue: string | number | undefined) => {
    if (typeof newValue === 'number') {
      setQuantity(newValue);
    } else {
      setQuantity(1);
    }
  };

  const handleOk = async () => {
    try {
      setRegistrationRequest(AsyncRequestLoading());
      const result: void = await protectedApiClient.registerTickets({
        lineItemRequests: [
          {
            eventId,
            quantity,
          },
        ],
      });
      onCloseEventRegistrationModal();
      setRegistrationRequest(AsyncRequestCompleted(result));
    } catch (e) {
      setRegistrationRequest(AsyncRequestFailed(e));
    }
  };
  return (
    <StyledModal
      visible={showEventRegistrationModal}
      title={eventTitle}
      okButtonProps={{
        disabled:
          asyncRequestIsLoading(registrationRequest) ||
          privilegeLevel === PrivilegeLevel.NONE,
      }}
      onOk={handleOk}
      okText={'Register'}
      onCancel={() => {
        onCloseEventRegistrationModal();
      }}
      width="625px"
    >
      {asyncRequestIsFailed(registrationRequest) && (
        <AlertWithMargin
          type="error"
          message={registrationRequest.error.response.data}
        />
      )}
      <ContentDiv>
        {privilegeLevel === PrivilegeLevel.NONE ? (
          <BoldCenterText>
            Please log in to register for this event.
          </BoldCenterText>
        ) : (
          <>
            <LeftAlignedText>Number of Tickets</LeftAlignedText>
            <TicketInputNumber
              size="large"
              min={1}
              precision={0}
              value={quantity}
              placeholder="Number of Tickets"
              onChange={updateQuantity}
            />
          </>
        )}
      </ContentDiv>
    </StyledModal>
  );
};

export default EventRegistrationModal;
