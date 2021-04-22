import {
  EditOutlined,
  ExclamationCircleOutlined,
  KeyOutlined,
  MailOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Routes } from '../../App';
import { ContentContainer } from '../../components';
import { LinkButton } from '../../components/LinkButton';
import { ORANGE } from '../../utils/colors';

const CenteredOrangeTitle = styled.h1`
  text-align: center;
  font-weight: 800;
  font-size: 2em;
  color: ${ORANGE};
`;

const CenteredButtonContainer = styled.div`
  display: block;
  max-width: 400px;
  margin: auto;
`;

const SettingsButton = styled(LinkButton)`
  width: 100%;
  min-height: 3rem;
  margin-bottom: 1rem;
`;

const Settings: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta
          name="description"
          content="Settings for Lucy's Love Bus Programs account."
        />
      </Helmet>
      <ContentContainer>
        <CenteredOrangeTitle>Settings</CenteredOrangeTitle>
        <CenteredButtonContainer>
          <SettingsButton to={Routes.CHANGE_ACCOUNT_EMAIL}>
            Change Primary Account Email
            <MailOutlined />
          </SettingsButton>
          <SettingsButton to={Routes.CHANGE_PASSWORD}>
            Change Password
            <KeyOutlined />
          </SettingsButton>
          <SettingsButton to={Routes.SET_CONTACTS}>
            Edit Account Information
            <EditOutlined />
          </SettingsButton>
          <SettingsButton to={Routes.PERSONAL_REQUESTS}>
            Request to Become a Participating Family
            <UsergroupAddOutlined />
          </SettingsButton>
          <SettingsButton to={Routes.DEACTIVATE_ACCOUNT}>
            Deactivate Account
            <ExclamationCircleOutlined />
          </SettingsButton>
        </CenteredButtonContainer>
      </ContentContainer>
    </>
  );
};

export default Settings;
