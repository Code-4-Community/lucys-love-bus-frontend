import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Typography } from 'antd';
import styled from 'styled-components';
import { ChungusContentContainer } from '../../components';
import { getRequestStatuses } from './ducks/thunks';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { connect, useDispatch, useSelector } from 'react-redux';
import { PersonalRequestsReducerState } from './ducks/types';
import { C4CState } from '../../store';
import { InfoModal } from '../../components/InfoModal';
import { Routes } from '../../App';
import { Link } from 'react-router-dom';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { PreviousRequests } from '../../components/personalRequests/PreviousRequests';
import { SubmitPFRequest } from '../../components/personalRequests/SubmitPFRequest';
import { hasPendingRequest } from './ducks/selectors';

const { Title } = Typography;

export interface PersonalRequestsProps {
  readonly personalRequests: PersonalRequestsReducerState['personalRequests'];
}

const Content = styled.div`
  text-align: center;
`;

const StyledSubTitle = styled(Title)`
  font-size: 22px !important;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const InfoButton = styled(Button)`
  border: 1px solid black;
  border-radius: 50%;
  margin-left: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 11px;
  vertical-align: middle;
`;

const PersonalRequests: React.FC<PersonalRequestsProps> = ({
  personalRequests,
}) => {
  const [isInfoModalVisible, setIsInfoModalVisible] = React.useState(false);
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestStatuses());
  }, [dispatch]);

  const getUserRole = (): string => {
    switch (privilegeLevel) {
      case PrivilegeLevel.STANDARD:
        return 'General Public';
      case PrivilegeLevel.PF:
        return 'Participating Family';
      case PrivilegeLevel.ADMIN:
        return 'Admin';
      default:
        return '';
    }
  };

  const getRoleDescription = (): string | JSX.Element => {
    switch (privilegeLevel) {
      case PrivilegeLevel.STANDARD:
        return (
          <span>
            A General Public account can be created by anyone and allows users
            to sign up for events within 5 days of their start date for $5 per
            ticket. If you believe you qualify as a Participating Family with
            full event access you can apply on the{' '}
            {
              <Link to={Routes.PERSONAL_REQUESTS} component={Typography.Link}>
                {' '}
                requests page of account settings{' '}
              </Link>
            }
          </span>
        );
      case PrivilegeLevel.PF:
        return (
          <span>
            A Participating Family account has a family member that is suffering
            from an ailment that Lucy's Love Bus can help with their therapeutic
            events. You have full access to all LLB events for free or reduced
            price.
          </span>
        );
      case PrivilegeLevel.ADMIN:
        return (
          <span>
            An Admin is in charge of creating events and announcements for users
            of the application. Admin accounts can not be created or deleted but
            the owners email and password can be changed from the{' '}
            {
              <Link to={Routes.SETTINGS} component={Typography.Link}>
                {' '}
                account settings page{' '}
              </Link>
            }
          </span>
        );
      default:
        return '';
    }
  };

  const onNewRequest = (): void => {
    dispatch(getRequestStatuses());
  };

  return (
    <>
      {asyncRequestIsFailed(personalRequests) && (
        <p>The request statuses could not be retrieved.</p>
      )}
      {asyncRequestIsLoading(personalRequests) && (
        <p>Loading personal requests...</p>
      )}
      {asyncRequestIsComplete(personalRequests) && (
        <>
          <Helmet>
            <title>Personal Requests</title>
            <meta name="Personal Requests" content="All personal requests." />
          </Helmet>
          <ChungusContentContainer>
            <Content>
              <Title>Participating Family Requests</Title>
              <StyledSubTitle>
                Your current account status is:{' '}
                <BoldText>{getUserRole()}</BoldText>
                <InfoButton
                  onClick={() => {
                    setIsInfoModalVisible((prevState) => !prevState);
                  }}
                >
                  ?
                </InfoButton>
                <InfoModal
                  isVisible={isInfoModalVisible}
                  setIsModalVisible={setIsInfoModalVisible}
                  title={`Your Account Role is: ${getUserRole()}`}
                  message={getRoleDescription()}
                />
              </StyledSubTitle>
              {asyncRequestIsComplete(personalRequests) && (
                <>
                  {personalRequests.result.length && (
                    <PreviousRequests requests={personalRequests.result} />
                  )}
                  {!hasPendingRequest(personalRequests.result) && (
                    <SubmitPFRequest onNewRequest={onNewRequest} />
                  )}
                </>
              )}
            </Content>
          </ChungusContentContainer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: C4CState): PersonalRequestsProps => {
  return {
    personalRequests: state.personalRequestsState.personalRequests,
  };
};

export default connect(mapStateToProps)(PersonalRequests);
