import { Menu } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Routes } from '../App';
import { logout } from '../auth/ducks/thunks';
import { UserAuthenticationReducerState } from '../auth/ducks/types';
import { asyncRequestIsComplete } from '../utils/asyncRequest';

const StyledMenu = styled(Menu)`
  min-width: 100px;
`;
// Dropdown menu options for the logged in
const UserMenu: React.FC<{
  tokens: UserAuthenticationReducerState['tokens'];
}> = ({ tokens }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <StyledMenu>
      <Menu.Item
        onClick={() => {
          history.push(Routes.HOME);
        }}
      >
        Home
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push(Routes.UPCOMING_EVENTS);
        }}
      >
        Upcoming Events
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push(Routes.ANNOUNCEMENTS);
        }}
      >
        Announcements
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push(Routes.MY_EVENTS);
        }}
      >
        My Events
      </Menu.Item>

      <Menu.Item
        onClick={() => {
          history.push(Routes.SETTINGS);
        }}
      >
        Settings
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (asyncRequestIsComplete(tokens)) {
            dispatch(logout());
            history.push(Routes.HOME);
            history.go(0);
          }
        }}
      >
        Log Out
      </Menu.Item>
    </StyledMenu>
  );
};

export default UserMenu;
