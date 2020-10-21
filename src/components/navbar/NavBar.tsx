import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu, Dropdown, Image, Typography, Row, Col, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Navbar.less'

const { Text } = Typography;


const NavBar: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const path: string = location.pathname;

  function pathnameToKey(pathname: string) {
    switch (pathname) {
      case '/':
        return '1';
      case '/block-template':
        return '2';
      case '/grid-template':
        return '3';
      case '/change-primary-email':
        return '4';
      case '/account-details':
        return '5';
      case '/change-password':
        return '6';
      case '/deactivate-account':
        return '7';
      default:
        return '1';
    }
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="4">Change Primary Account Email</Menu.Item>
      <Menu.Item key="5">Account Details</Menu.Item>
      <Menu.Item key="6">Change Password</Menu.Item>
      <Menu.Item key="7">Deactivate Account</Menu.Item>
    </Menu>
  );

  return (
    <Row align="middle">
      <Col flex={1}>
        <Link to="/">
          <Image 
            width={90} 
            height={80} 
            src={"https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_2019_Sq_rgb+1.png"} 
            alt={"LLB Logo"} 
            style={{float: "right"}}
          />
        </Link>
      </Col>
      <Col flex={1}>
        <Text 
          strong 
          style={{fontSize: "24px"}}
          >
          Lucy's Love Bus
        </Text>
        <br/>
        <Text 
          strong 
        >
          Event Registration
        </Text>
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
      {/* <Col flex={3}>
      <Dropdown overlay={userMenu}>
        <Button className="userDropdown">
          <UserOutlined /> John Smith <DownOutlined />
        </Button>
      </Dropdown>
      </Col> */}
      <Col flex={3}>
        <div className="loginAndSignupBtns">
          <Button 
            type="link" 
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
    </Row>
  );
};

export default NavBar;
