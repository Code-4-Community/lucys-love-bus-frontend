import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Col, Dropdown, Image, Menu, Row, Typography } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { connect } from 'react-redux';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PRIMARY } from '../../utils/colors';
import { Routes } from '../../App';

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
    color: ${PRIMARY};
  }
`;

const ActiveNavBarButton = styled(NavBarButton)`
  color: ${PRIMARY};
  font-weight: 500;
`;

const Logo = styled(Image)`
  width: 300px;
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
  color: ${PRIMARY};
`;

const UserContainer = styled.div`
  margin-right: 16px;
`;

interface NavBarProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const NavBar: React.FC<NavBarProps> = ({ tokens }) => {
  const history = useHistory();
  const location = useLocation();

  const privilegeLevel: PrivilegeLevel = getPrivilegeLevel(tokens);
  const links = {
    Home: Routes.HOME,
  };

  // Dropdown menu options for the logged in
  const userMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          history.push(Routes.SETTINGS);
        }}
      >
        Settings
      </Menu.Item>
    </Menu>
  );

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
                  src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Icons/C4C-Banner_Landing.jpeg"
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
                  <NavBarText>Code4Community</NavBarText>
                </Row>
                <Row>
                  <Subtitle>Frontend Scaffold</Subtitle>
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
              </Row>
            </Col>
          </Row>
        </LogoContainer>

        <UserContainer>
          <Row gutter={[8, 0]}>
            {privilegeLevel !== PrivilegeLevel.NONE ? (
              <Col>
                <Dropdown overlay={userMenu}>
                  <Button>
                    <UserOutlined />
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
            ) : (
              <>
                <Col>
                  <Button
                    tab-index="0"
                    onClick={() => {
                      history.push(Routes.LOGIN);
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
    </>
  );
};

const mapStateToProps = (state: C4CState): NavBarProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(NavBar);
