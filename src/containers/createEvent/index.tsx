import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestCompleted, AsyncRequestFailed, asyncRequestIsComplete, AsyncRequestLoading, AsyncRequestNotStarted } from '../../utils/asyncRequest';
import EventsForm from '../../components/EventsForm';
import FormInitialText from '../../components/FormInitialText';
import { Typography } from 'antd';
import { createEvent } from './ducks/thunks';
import { EventsFormData } from '../../components/EventsForm';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';
import { NewEventInformation } from './ducks/types';

interface CreateEventProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const { Title } = Typography;

const CreateEventContainer: React.FC<CreateEventProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [createEventRequest, setCreateEventRequest] = useState<
    AsyncRequest<void, any>
  >(AsyncRequestNotStarted());

  if (asyncRequestIsComplete(createEventRequest)) {
        history.push(Routes.UPCOMING_EVENTS);
  }

  const onFinish = async (data: EventsFormData) => {
    const eventPicture =
      data.thumbnail &&
      (await encodeProfileFieldFile(data.thumbnail));
  
    try {
      setCreateEventRequest(AsyncRequestLoading());
      await (dispatch(
      createEvent({
        title: data.title,
        capacity: data.capacity,
        thumbnail: eventPicture,
        price: data.price,
        details: {
          description: data.description,
          location: data.location,
          start: data.start,
          end: data.end,
        },
      }),
    ));
    setCreateEventRequest(AsyncRequestCompleted(undefined));
    } catch (err) {
      setCreateEventRequest(AsyncRequestFailed(err));
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Event</title>
        <meta name="description" content="Create a new Event" />
      </Helmet>
      <ContentContainer>
        <FormInitialText>
          <Title level={3}>Create an Event</Title>
        </FormInitialText>
        <EventsForm onFinish={onFinish} tokens={tokens} edit={false} />
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): CreateEventProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(CreateEventContainer);
