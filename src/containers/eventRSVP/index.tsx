import { Alert, Spin, Table } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { getEventRegistrations } from './ducks/thunks';
import { EventRegistrationsReducerState } from './ducks/types';

interface EventRSVPProps {
  readonly registrations: EventRegistrationsReducerState['eventRegistrations'];
}

const EventRSVP: React.FC<EventRSVPProps> = ({ registrations }) => {
  const dispatch = useDispatch();
  const id = parseInt(useParams<{ id: string }>().id);

  useEffect(() => {
    dispatch(getEventRegistrations(id));
  });

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Age',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Type',
      dataIndex: 'privilegeLevel',
      key: 'privilegeLevel',
    },
    {
      title: 'Phone No.',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Consent to Photo/Video Release',
      dataIndex: 'photoRelease',
      key: 'photoRelease',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Event RSVP</title>
        <meta
          name="description"
          content="List of users who have RSVP'ed to this event."
        />
      </Helmet>
      <ContentContainer>
        {asyncRequestIsComplete(registrations) && (
          <Table columns={columns} dataSource={registrations.result} />
        )}

        {asyncRequestIsLoading(registrations) && <Spin />}
        {asyncRequestIsFailed(registrations) && (
          <Alert
            message="Error"
            description={`There was an error loading registrations:\n${registrations.error}`}
            type="error"
            showIcon
          />
        )}
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): EventRSVPProps => {
  return {
    registrations: state.eventRegistrationsState.eventRegistrations,
  };
};

export default connect(mapStateToProps)(EventRSVP);
