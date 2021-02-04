import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import { AnnouncementsList } from '../../components/announcements-list/AnnouncementsList';
import styled from 'styled-components';
import { ChungusContentContainer } from '../../components';

const { Title } = Typography;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled(Title)`
  margin: 12px;
  margin-left: 0px;
`;

const Announcements: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Announcements</title>
                <meta name="Upcoming Events" content="Description goes here." />
            </Helmet>
            <ChungusContentContainer>
                <Content>
                    <StyledTitle>Announcements</StyledTitle>
                </Content>
                <AnnouncementsList/>
            </ChungusContentContainer>
        </>
    );
};

export default Announcements;
