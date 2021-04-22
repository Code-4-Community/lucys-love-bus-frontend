import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import EventsForm from '../../components/EventsForm';
import FormInitialText from '../../components/FormInitialText';
import { Typography } from 'antd';
import { clearEventRequest, createAnEvent } from './ducks/thunks';
import { EventsFormData } from '../../components/EventsForm';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';

const { Title } = Typography;

const CreateEventContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createEventRequest = useSelector(
    (state: C4CState) => state.eventControlState.event,
  );

  if (asyncRequestIsComplete(createEventRequest)) {
    dispatch(clearEventRequest());
    history.push('/events/' + createEventRequest.result.id);
  }

  const onFinish = async (data: EventsFormData) => {
    const eventPicture =
      data.thumbnail && (await encodeProfileFieldFile(data.thumbnail));
    dispatch(
      createAnEvent({
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
    );
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
