import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown, Typography, Row, Col, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './navbar.less';

const { Text } = Typography;

const NavBar: React.FC = () => {
  const history = useHistory();
  const authenticated = false;

  const userMenu = (
    <Menu>
      <Menu.Item>Change Primary Account Email</Menu.Item>
      <Menu.Item>Account Details</Menu.Item>
      <Menu.Item>Change Password</Menu.Item>
      <Menu.Item>Deactivate Account</Menu.Item>
    </Menu>
  );

  return (
    <Row align="middle">
      <Col flex={1}>
        <Link
          to="/"
          onClick={() => {
            history.push('/');
          }}
        >
          <img
            className="llbLogo"
            src={
              'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_2019_Sq_rgb+1.png'
            }
            alt={'LLB Logo'}
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
          <Text className="llbText" strong>
            Lucy's Love Bus
          </Text>
          <br />
          <Text strong>Event Registration</Text>
        </Link>
      </Col>

      <Col flex={3}>
        <Button
          type="link"
          onClick={() => {
            history.push('/');
          }}
        >
          Home
        </Button>
        <Button
          type="link"
          onClick={() => {
            history.push('/block-template');
          }}
        >
          Upcoming Events
        </Button>
        <Button
          type="link"
          onClick={() => {
            history.push('/grid-template');
          }}
        >
          My Events
        </Button>
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
    </Row>
  );
};

export default NavBar;
