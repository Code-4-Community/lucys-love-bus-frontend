import React from 'react';
import { InputNumber, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { PrivilegeLevel, TokenPayload } from '../../../auth/ducks/types';
import { C4CState } from '../../../store';
import { connect } from 'react-redux';
import protectedApiClient from '../../../api/protectedApiClient';
import { getPrivilegeLevel } from '../../../auth/ducks/selectors';

const { Text } = Typography;

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
  const privilegeLevel: PrivilegeLevel = getPrivilegeLevel(tokens);

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
        okButtonProps={{ disabled: privilegeLevel === PrivilegeLevel.NONE }}
        onOk={handleOk}
        okText={'Register'}
        onCancel={() => {
          onCloseEventRegistrationModal();
        }}
        width={'625px'}
      >
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
                min={0}
                precision={0}
                value={quantity}
                placeholder="Number of Tickets"
                onChange={updateQuantity}
              />
            </>
          )}
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
