import React, { useState } from 'react';
import { LinkButton } from '../../components';
import { Menu, Dropdown, Image, Typography, Row, Col, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const { Text } = Typography;

const NavRow = styled(Row)`
  background-color: white;
  padding: 1em 0;
`;
const AntButtonLink = styled(LinkButton)`
  color: black;
  margin-left: 7em;
`;
const Logo = styled.img`
  float: right;
`;
const LogoText = styled(Text)`
  font-size: 24px;
`;
const UserDropdown = styled(Button)`
  float: right;
  margin-right: 3em;
`;

const LoginSignupButtons = styled.div`
  float: right;
  margin-right: 3em;
`;

const SignupButton = styled(Button)`
  margin-left: 1em;
`;

const NavBar: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const userMenu = (
    <Menu>
      <Menu.Item>Change Primary Account Email</Menu.Item>
      <Menu.Item>Account Details</Menu.Item>
      <Menu.Item>Change Password</Menu.Item>
      <Menu.Item>Deactivate Account</Menu.Item>
    </Menu>
  );

  return (
    <NavRow align="middle">
      <Col flex={1}>
        <Link to="/">
          <Logo
            src={
              'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/LLB_2019_Sq_rgb+1.png'
            }
            alt={'Site Logo'}
          />
        </Link>
      </Col>

      <Col flex={1}>
        <Link to="/">
          <LogoText strong>Frontend Scaffold</LogoText>
          <br />
          <Text strong>Subtitle goes here</Text>
        </Link>
      </Col>

      <Col flex={3}>
        <AntButtonLink to="/">Home</AntButtonLink>
        <AntButtonLink to="/block-template">Block Template</AntButtonLink>
        <AntButtonLink to="/grid-template">Grid Template</AntButtonLink>
      </Col>

      <div>
        {authenticated ? (
          <Col flex={3}>
            <Dropdown overlay={userMenu}>
              <UserDropdown>
                <UserOutlined /> John Smith <DownOutlined />
              </UserDropdown>
            </Dropdown>
          </Col>
        ) : (
          <Col flex={3}>
            <LoginSignupButtons>
              <LinkButton to="/login" component={Button}>
                Login
              </LinkButton>
              <LinkButton to="/signup" component={SignupButton} type="primary">
                Signup
              </LinkButton>
            </LoginSignupButtons>
          </Col>
        )}
      </div>
    </NavRow>
  );
};

export default NavBar;
