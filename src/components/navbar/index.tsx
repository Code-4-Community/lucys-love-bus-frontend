import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown, Typography, Row, Col, Button, Image } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from '../modals/login-modal/LoginModal';

const { Text } = Typography;

// Custom styling for the navbar links - Home, Upcoming Events, My Events
const NavBarButton = styled(Button)`
  color: black;
  padding-left: 1em;
  padding-right: 1em;
`;

const LLBLogo = styled(Image)`
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

const LLBTextColumn = styled(Col)`
  padding-right: 16px;
`;
const LLBText = styled(Text)`
  font-size: 1.6em;
  font-weight: 700;
  line-height: 1.15;
`;

const LLBSubtitle = styled(Text)`
  color: #CE4A00;
`;

const UserContainer = styled.div`
  margin-right: 16px; 
`

const NavBar: React.FC = () => {
  const history = useHistory();
  const authenticated = false;
  const links = {
    Home: '/',
    'Upcoming Events': '/upcoming-events',
    'My Events': '/grid-template',
  };

  // Dropdown menu options for the logged in
  const userMenu = (
    <Menu>
      <Menu.Item>Change Primary Account Email</Menu.Item>
      <Menu.Item>Account Details</Menu.Item>
      <Menu.Item>Change Password</Menu.Item>
      <Menu.Item>Deactivate Account</Menu.Item>
    </Menu>
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
                <LLBLogo
                  src="https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_logo_no_text.png"
                  alt="LLB Logo"
                  preview={false}
                />
              </Link>
            </Col>
            <LLBTextColumn>
              <Link
                to="/"
                onClick={() => {
                  history.push('/');
                }}
              >
                <Row>
                  <LLBText>Lucy's Love Bus</LLBText>
                </Row>
                <Row>
                  <LLBSubtitle>Event Registration </LLBSubtitle>
                </Row>
              </Link>
            </LLBTextColumn>
            <Col>
              <Row justify="space-between">
                {Object.entries(links).map(([link, path], i) => (
                  <Col key={i}>
                    <NavBarButton
                      type="link"
                      onClick={() => {
                        history.push(path);
                      }}
                    >
                      {link}
                    </NavBarButton>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </LogoContainer>

        <UserContainer>
          <Row gutter={[8, 0]}>
            {authenticated ? (
              <Col>
                <Dropdown overlay={userMenu}>
                  <Button>
                    <UserOutlined /> John Smith <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
            ) : (
                <>
                  <Col>
                    <Button
                      onClick={() => {
                        setDisplayLoginModal(true);
                      }}
                    >
                      Login
                </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        history.push('/signup');
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
        showLoginModal={displayLoginModal}
        onCloseLoginModal={() => {
          setDisplayLoginModal(false);
        }}
      />
    </>
  );
};

export default NavBar;
