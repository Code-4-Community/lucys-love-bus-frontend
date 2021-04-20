import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Image,
  Menu,
  Row,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { logout } from '../../auth/ducks/thunks';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { getContactInfo } from '../../containers/setContacts/ducks/thunks';
import { ContactsReducerState } from '../../containers/setContacts/ducks/types';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { ORANGE } from '../../utils/colors';
import LoginModal from '../modals/login-modal/LoginModal';

const { Text } = Typography;

// Custom styling for the navbar links - Home, Upcoming Events, My Events
const NavBarButton = styled(Button)`
  color: black;
  padding-left: 1em;
  padding-right: 1em;
  :active {
    color: inherit;
  }
  :hover {
    color: ${ORANGE};
  }
`;

const ActiveNavBarButton = styled(NavBarButton)`
  color: ${ORANGE};
  font-weight: 500;
`;

const Logo = styled(Image)`
  width: 100px;
  margin: 16px;
`;

const NavBarContainer = styled.div`
  margin: auto;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  flex-wrap: row-wrap;
`;

const LogoContainer = styled.div`
  padding-right: 24px;
`;

const TextColumn = styled(Col)`
  padding-right: 16px;
`;
const NavBarText = styled(Text)`
  font-size: 1.6em;
  font-weight: 700;
  line-height: 1.15;
`;

const Subtitle = styled(Text)`
  color: ${ORANGE};
`;

const UserContainer = styled.div`
  margin-right: 16px;
`;

const UserMenu = styled(Menu)`
  min-width: 100px;
`;
const UserDropdown = styled(Dropdown)`
  min-height: 50px;
`;
const UserAvatar = styled(Avatar)`
  margin-right: 10px;
`;

interface NavBarProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
  readonly contacts: ContactsReducerState['contacts'];
}

const NavBar: React.FC<NavBarProps> = ({ tokens, contacts }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (asyncRequestIsComplete(tokens)) {
      dispatch(getContactInfo());
    }
  }, [dispatch, tokens]);

  const privilegeLevel: PrivilegeLevel = getPrivilegeLevel(tokens);
  const links = {
    Home: Routes.HOME,
    'Upcoming Events': Routes.UPCOMING_EVENTS,
    Announcements: Routes.ANNOUNCEMENTS,
  };
  const authLinks = {
    'My Events': Routes.MY_EVENTS,
  };

  // Dropdown menu options for the logged in
  const userMenu = (
    <UserMenu>
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
          }
        }}
      >
        Log Out
      </Menu.Item>
    </UserMenu>
  );

  const [displayLoginModal, setDisplayLoginModal] = useState(false);

  return (
    <>
      <NavBarContainer>
        <LogoContainer>
          <Row justify="center" align="middle">
            <Col>
              <Link
                to="/"
                onClick={() => {
                  history.push('/');
                }}
              >
                <Logo
                  src="https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_logo_no_text.png"
                  alt="LLB Logo"
                  preview={false}
                />
              </Link>
            </Col>
            <TextColumn>
              <Link
                to="/"
                onClick={() => {
                  history.push('/');
                }}
              >
                <Row>
                  <NavBarText>Lucy's Love Bus</NavBarText>
                </Row>
                <Row>
                  <Subtitle>Event Registration</Subtitle>
                </Row>
              </Link>
            </TextColumn>
            <Col>
              <Row justify="space-between">
                {Object.entries(links).map(([link, path], i) => (
                  <Col key={i}>
                    {path === location.pathname ? (
                      <ActiveNavBarButton
                        type="link"
                        onClick={() => {
                          history.push(path);
                        }}
                      >
                        {link}
                      </ActiveNavBarButton>
                    ) : (
                      <NavBarButton
                        tab-index="0"
                        type="link"
                        onClick={() => {
                          history.push(path);
                        }}
                      >
                        {link}
                      </NavBarButton>
                    )}
                  </Col>
                ))}
                {privilegeLevel !== PrivilegeLevel.NONE && (
                  <>
                    {Object.entries(authLinks).map(([link, path], i) => (
                      <Col key={i}>
                        {path === location.pathname ? (
                          <ActiveNavBarButton
                            type="link"
                            onClick={() => {
                              history.push(path);
                            }}
                          >
                            {link}
                          </ActiveNavBarButton>
                        ) : (
                          <NavBarButton
                            tab-index="0"
                            type="link"
                            onClick={() => {
                              history.push(path);
                            }}
                          >
                            {link}
                          </NavBarButton>
                        )}
                      </Col>
                    ))}{' '}
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </LogoContainer>

        <UserContainer>
          <Row gutter={[8, 0]}>
            {privilegeLevel !== PrivilegeLevel.NONE ? (
              <Col>
                <UserDropdown overlay={userMenu}>
                  <Button>
                    <UserAvatar
                      src={
                        asyncRequestIsComplete(contacts) &&
                        contacts.result.mainContact.profilePicture
                      }
                      icon={<UserOutlined />}
                    />
                    <Text>
                      {asyncRequestIsComplete(contacts)
                        ? contacts.result.mainContact.firstName +
                          ' ' +
                          contacts.result.mainContact.lastName
                        : 'Loading...'}
                    </Text>
                    <DownOutlined />
                  </Button>
                </UserDropdown>
              </Col>
            ) : (
              <>
                <Col>
                  <Button
                    tab-index="0"
                    onClick={() => {
                      setDisplayLoginModal(true);
                    }}
                  >
                    Login
                  </Button>
                </Col>
                <Col>
                  <Button
                    tab-index="0"
                    type="primary"
                    onClick={() => {
                      history.push(Routes.SIGNUP);
                    }}
                  >
                    Sign Up
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </UserContainer>
      </NavBarContainer>
      <LoginModal
        showLoginModal={
          privilegeLevel === PrivilegeLevel.NONE && displayLoginModal
        }
        onCloseLoginModal={() => {
          setDisplayLoginModal(false);
        }}
      />
    </>
  );
};

const mapStateToProps = (state: C4CState): NavBarProps => {
  return {
    tokens: state.authenticationState.tokens,
    contacts: state.contactsState.contacts,
  };
};

export default connect(mapStateToProps)(NavBar);
