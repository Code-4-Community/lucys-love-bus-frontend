import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Row, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../App';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../auth/ducks/types';
import { ContactsReducerState } from '../containers/setContacts/ducks/types';
import { asyncRequestIsComplete } from '../utils/asyncRequest';
import AdminMenu from './AdminMenu';
import UserMenu from './UserMenu';

const { Text } = Typography;

const UserContainer = styled.div`
  margin-right: 16px;
`;

const UserDropdown = styled(Dropdown)`
  min-height: 50px;
`;
const UserAvatar = styled(Avatar)`
  margin-right: 10px;
`;

const NavDropdown: React.FC<{
  tokens: UserAuthenticationReducerState['tokens'];
  contacts: ContactsReducerState['contacts'];

  setDisplayLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  privilegeLevel: PrivilegeLevel;
}> = ({ tokens, contacts, privilegeLevel, setDisplayLoginModal }) => {
  const history = useHistory();

  return (
    <UserContainer>
      <Row gutter={[8, 0]}>
        {privilegeLevel !== PrivilegeLevel.NONE ? (
          <Col>
            <UserDropdown
              overlay={
                privilegeLevel === PrivilegeLevel.ADMIN ? (
                  <AdminMenu tokens={tokens} />
                ) : (
                  <UserMenu tokens={tokens} />
                )
              }
            >
              <Button>
                <UserAvatar
                  src={
                    asyncRequestIsComplete(contacts)
                      ? contacts.result.mainContact.profilePicture
                      : undefined
                  }
                  icon={<UserOutlined />}
                />
                <Text>
                  {asyncRequestIsComplete(contacts)
                    ? `${contacts.result.mainContact.firstName} ${contacts.result.mainContact.lastName}`
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
  );
};

export default NavDropdown;
