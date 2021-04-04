import { Alert, Space, Spin, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { ChungusContentContainer } from '../../components';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { getUpcomingEvents } from '../upcoming-events/ducks/thunks';
import { EventsReducerState } from '../upcoming-events/ducks/types';
import { getEventRegistrations } from './ducks/thunks';
import { EventRegistrationsReducerState, Registration } from './ducks/types';

const { Title, Link } = Typography;
interface EventRSVPProps {
  readonly events: EventsReducerState['upcomingEvents'];
  readonly registrations: EventRegistrationsReducerState['eventRegistrations'];
}

const TablePhotoConsent = (text: Registration, record: Registration) => (
  <Space size="middle">{record.photoRelease ? 'Yes' : 'No'}</Space>
);
const TableActions = (text: Registration, record: Registration) => (
  <Space size="middle">
    {/* TODO: Make the family details page and route to it here */}
    <RouterLink to={`/family-details/${record.userId}`}>
      <Link>View {record.firstName}'s Family Details</Link>
    </RouterLink>
  </Space>
);

const EventRSVP: React.FC<EventRSVPProps> = ({ events, registrations }) => {
  const dispatch = useDispatch();
  const id: number = parseInt(useParams<{ id: string }>().id, 10);

  useEffect(() => {
    dispatch(getUpcomingEvents());
    dispatch(getEventRegistrations(id));
  }, [dispatch]);

  const columns = [
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
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      render: TablePhotoConsent,
    },
    {
      title: 'Action',
      key: 'action',
      render: TableActions,
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
      <ChungusContentContainer>
        {asyncRequestIsComplete(events) && (
          <Title level={3}>
            Registrations for {events.result.find((e) => e.id === id)?.title}
          </Title>
        )}

        {asyncRequestIsLoading(events) && <Spin />}
        {asyncRequestIsFailed(events) && (
          <Alert
            message="Error"
            description={`There was an error loading events: ${events.error.message}`}
            type="error"
            showIcon
          />
        )}

        {asyncRequestIsComplete(registrations) && (
          <Table columns={columns} dataSource={registrations.result} />
        )}

        {asyncRequestIsLoading(registrations) && <Spin />}
        {asyncRequestIsFailed(registrations) && (
          <Alert
            message="Error"
            description={`There was an error loading registrations: ${registrations.error.message}`}
            type="error"
            showIcon
          />
        )}
      </ChungusContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): EventRSVPProps => {
  return {
    events: state.eventsState.upcomingEvents,
    registrations: state.eventRegistrationsState.eventRegistrations,
  };
};

export default connect(mapStateToProps)(EventRSVP);
