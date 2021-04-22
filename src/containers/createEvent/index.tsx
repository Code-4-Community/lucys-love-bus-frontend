import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { ContentContainer } from '../../components';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';
import EventsForm from '../../components/EventsForm';
import FormInitialText from '../../components/FormInitialText';
import { Typography } from 'antd';
import { EventsFormData } from '../../components/EventsForm';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';
import { EventInformation } from '../upcoming-events/ducks/types';
import protectedApiClient from '../../api/protectedApiClient';

const { Title } = Typography;

const CreateEventContainer: React.FC = () => {
  const history = useHistory();
  const [createEventRequest, setCreateEventRequest] = useState<
    AsyncRequest<EventInformation, any>
  >(AsyncRequestNotStarted());

  if (asyncRequestIsComplete(createEventRequest)) {
    history.push('/events/' + createEventRequest.result.id);
  }

  const onFinish = async (data: EventsFormData) => {
    const eventPicture =
      data.thumbnail && (await encodeProfileFieldFile(data.thumbnail));
    let response: EventInformation | undefined;
    try {
      setCreateEventRequest(AsyncRequestLoading());
      response = await protectedApiClient.createEvent({
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
      });
      setCreateEventRequest(AsyncRequestCompleted(response));
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
        <EventsForm
          onFinish={onFinish}
          eventRequest={createEventRequest}
          edit={false}
        />
      </ContentContainer>
    </>
  );
};

export default CreateEventContainer;
