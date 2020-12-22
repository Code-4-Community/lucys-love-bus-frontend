import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown, Typography, Row, Col, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './navbar.less';

const { Text } = Typography;

// Custom styling for the navbar links - Home, Upcoming Events, My Events
const StyledButton = styled(Button)`
  color: black;
  margin-left: 7em;
`;

// Custom styling for the navbar row
const StyledRow = styled(Row)`
  background-color: white;
  padding: 1em 0;
`;

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

  return (
    <StyledRow align="middle">
      <Col flex={1}>
        <Link
          to="/"
          onClick={() => {
            history.push('/');
          }}
        >
          <img
            className="llbLogo"
            src="https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_2019_Sq_rgb+1.png"
            alt="LLB Logo"
          />
        </Link>
      </Col>

      <Col flex={1}>
        
        <Link
          to="/"
          onClick={() => {
            history.push('/');
          }}
        >
          <Row>
          <Text className="llbText" strong>
            {' '}
            Lucy's Love Bus{' '}
          </Text>
          </Row>
          <Row>
          <Text strong> Event Registration </Text>
          </Row>
        </Link>
      </Col>

      <Col flex={3}>
        {Object.entries(links).map(([link, path], i) => (
          <StyledButton
            type="link"
            onClick={() => {
              history.push(path);
            }}
            key={i}
          >
            {link}
          </StyledButton>
        ))}
      </Col>

      <div>
        {authenticated ? (
          <Col flex={3}>
            <Dropdown overlay={userMenu}>
              <Button className="userDropdown">
                <UserOutlined /> John Smith <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        ) : (
          <Col flex={3}>
            <div className="loginAndSignupBtns">
              <Button
                className="loginBtn"
                onClick={() => {
                  history.push('/login');
                }}
              >
                Login
              </Button>
              <Button
                className="signUpBtn"
                onClick={() => {
                  history.push('/signup');
                }}
              >
                Sign Up
              </Button>
            </div>
          </Col>
        )}
      </div>
    </StyledRow>
  );
};

export default NavBar;
