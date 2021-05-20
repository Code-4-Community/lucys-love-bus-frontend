import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { getRequestStatuses } from '../../containers/personalRequests/ducks/thunks';
import { getContactInfo } from '../../containers/setContacts/ducks/thunks';
import { ContactsReducerState } from '../../containers/setContacts/ducks/types';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import LoginModal from '../modals/login-modal/LoginModal';
import NavDropdown from '../NavDropdown';
import NavLinks from '../NavLinks';

const NavBarContainer = styled.div`
  margin: auto;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
`;

interface NavBarProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
  readonly contacts: ContactsReducerState['contacts'];
}

const NavBar: React.FC<NavBarProps> = ({ tokens, contacts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (asyncRequestIsComplete(tokens)) {
      dispatch(getContactInfo());
      dispatch(getRequestStatuses());
    }
  }, [dispatch, tokens]);

  const privilegeLevel: PrivilegeLevel = getPrivilegeLevel(tokens);

  const [displayLoginModal, setDisplayLoginModal] = useState(false);

  return (
    <>
      <NavBarContainer>
        <NavLinks privilegeLevel={privilegeLevel} />
        <NavDropdown
          privilegeLevel={privilegeLevel}
          tokens={tokens}
          contacts={contacts}
          setDisplayLoginModal={setDisplayLoginModal}
        />
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
