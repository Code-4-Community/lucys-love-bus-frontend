import { Button, Col, Image, Row, Typography } from 'antd';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../App';
import { PrivilegeLevel } from '../auth/ducks/types';
import { ORANGE } from '../utils/colors';

const { Text } = Typography;

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

const NavLinks: React.FC<{ privilegeLevel: PrivilegeLevel }> = ({
  privilegeLevel,
}) => {
  const location = useLocation();
  const history = useHistory();
  const links = {
    Home: Routes.HOME,
    'Upcoming Events': Routes.UPCOMING_EVENTS,
    Announcements: Routes.ANNOUNCEMENTS,
  };
  const userLinks = {
    'My Events': Routes.MY_EVENTS,
    'My Requests': Routes.PERSONAL_REQUESTS,
  };
  const adminLinks = {
    // 'Create Event': Routes.CREATE_EVENT,
    // 'Make Announcement': Routes.CREATE_ANNOUNCEMENTS,
    'View Requests': Routes.VIEW_REQUESTS,
    'View All Users': Routes.USER_DIRECTORY,
  };
  return (
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
            {(privilegeLevel === PrivilegeLevel.STANDARD ||
              privilegeLevel === PrivilegeLevel.PF) && (
              <>
                {Object.entries(userLinks).map(([link, path], i) => (
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
            {privilegeLevel === PrivilegeLevel.ADMIN && (
              <>
                {Object.entries(adminLinks).map(([link, path], i) => (
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
              </>
            )}
          </Row>
        </Col>
      </Row>
    </LogoContainer>
  );
};

export default NavLinks;
