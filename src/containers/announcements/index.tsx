import { Alert, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { ChungusContentContainer } from '../../components';
import AnnouncementsList from '../../components/announcementsList';
import { LinkButton } from '../../components/LinkButton';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { getAnnouncements } from './ducks/thunks';
import { AnnouncementsReducerState } from './ducks/types';

const { Title } = Typography;

export interface AnnouncementsDataProps {
  readonly announcements: AnnouncementsReducerState['announcements'];
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled(Title)`
  margin: 12px;
  margin-left: 0px;
`;

const Announcements: React.FC<AnnouncementsDataProps> = ({ announcements }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });
  return (
    <>
      <Helmet>
        <title>Announcements</title>
        <meta
          name="Announcements"
          content="All announcements about upcoming Lucy's Love Bus events!"
        />
      </Helmet>
      <ChungusContentContainer>
        {asyncRequestIsFailed(announcements) && (
          <Alert
            message="Error"
            description={'Announcements could not be retrieved.'}
            type="error"
            showIcon
          />
        )}
        {asyncRequestIsLoading(announcements) && <Spin />}
        {asyncRequestIsComplete(announcements) && (
          <>
            <Content>
              <StyledTitle>Announcements</StyledTitle>
              {privilegeLevel === PrivilegeLevel.ADMIN && (
                <LinkButton type="primary" to={'/create-announcements'}>
                  Make Announcement
                </LinkButton>
              )}
            </Content>
            <AnnouncementsList announcements={announcements.result} />
          </>
        )}
      </ChungusContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): AnnouncementsDataProps => {
  return {
    announcements: state.announcementsState.announcements,
  };
};

export default connect(mapStateToProps)(Announcements);
