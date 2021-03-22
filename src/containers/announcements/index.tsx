import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import AnnouncementsList from '../../components/announcementsList';
import styled from 'styled-components';
import { ChungusContentContainer } from '../../components';
import { getAnnouncements } from './ducks/thunks';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { connect, useDispatch } from 'react-redux';
import { AnnouncementsReducerState } from './ducks/types';
import { C4CState } from '../../store';

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

const Announcements: React.FC<AnnouncementsDataProps> = ({
  announcements,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  return (
    <>
      {asyncRequestIsFailed(announcements) && (
        <p>The announcements could not be retrieved.</p>
      )}
      {asyncRequestIsLoading(announcements) && <p>Loading announcements...</p>}
      {asyncRequestIsComplete(announcements) && (
        <>
          <Helmet>
            <title>Announcements</title>
            <meta name="Announcements" content="All announcements about upcoming Lucy's Love Bus events!" />
          </Helmet>
          <ChungusContentContainer>
            <Content>
              <StyledTitle>Announcements</StyledTitle>
            </Content>
            <AnnouncementsList announcements={announcements.result} />
          </ChungusContentContainer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: C4CState): AnnouncementsDataProps => {
  return {
    announcements: state.announcementsState.announcements,
  };
};

export default connect(mapStateToProps)(Announcements);
