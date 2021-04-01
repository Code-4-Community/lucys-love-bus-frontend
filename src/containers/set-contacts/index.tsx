import { Radio, Typography } from 'antd';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ContactsForm from '../../components/ContactsForm';
import { C4CState } from '../../store';
import { ContactsReducerState } from './ducks/types';

interface UpcomingEventsProps {
  readonly contacts: ContactsReducerState['contacts'];
}

enum EventView {
  List,
  Calendar,
}

const SetContacts: React.FC<UpcomingEventsProps> = ({ contacts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return <ContactsForm />;
};

const mapStateToProps = (state: C4CState): UpcomingEventsProps => {
  return {
    contacts: state.contactsState.contacts,
  };
};

export default connect(mapStateToProps)(SetContacts);
