import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
  asyncRequestIsNotStarted,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';
import EventsForm, {
  EventsFormInitialValues,
} from '../../components/EventsForm';
import FormInitialText from '../../components/FormInitialText';
import { Alert, Spin, Typography } from 'antd';
import { clearEventRequest, editAnEvent } from '../createEvent/ducks/thunks';
import { EventsFormData } from '../../components/EventsForm';
import { EventInformation } from '../upcoming-events/ducks/types';
import protectedApiClient from '../../api/protectedApiClient';
import moment from 'moment';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';

const { Title } = Typography;

interface SingleEventParams {
  id: string;
}

const EditEventContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = Number(useParams<SingleEventParams>().id);
  const editEventRequest = useSelector((state: C4CState) => state.createEventState.newEvent);

  const [event, setEvent] = useState<AsyncRequest<EventInformation, any>>(
    AsyncRequestNotStarted(),
  );

  useEffect(() => {
    if (asyncRequestIsNotStarted(event)) {
      setEvent(AsyncRequestLoading());
      protectedApiClient
        .getEventInfoById(id)
        .then((res) => {
          setEvent(AsyncRequestCompleted(res));
        })
        .catch((error: any) => {
          setEvent(AsyncRequestFailed(error));
        });
    }
  }, [event, id]);

  if (asyncRequestIsComplete(editEventRequest)) {
    dispatch(clearEventRequest());
    history.push('/events/' + id);
  }
  
  const onFinish = async (data: EventsFormData) => {
    const eventPicture =
      data.thumbnail && (await encodeProfileFieldFile(data.thumbnail));

      dispatch(
        editAnEvent(id, {
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

  const mapEventInfoToFormData = (
    info: EventInformation,
  ): EventsFormInitialValues => {
    return {
      title: info.title,
      capacity: info.capacity,
      thumbnail: info.thumbnail,
      price: info.price,
      description: info.details.description,
      location: info.details.location,
      start: moment(info.details.start),
      end: moment(info.details.end),
    };
  };

  return (
    <>
      <Helmet>
        <title>Edit Event</title>
        <meta name="description" content="Edit an existing Event" />
      </Helmet>
      <ContentContainer>
        <FormInitialText>
          <Title level={3}>Edit Event</Title>
        </FormInitialText>
        {asyncRequestIsComplete(event) && (
          <EventsForm
            onFinish={onFinish}
            eventRequest={editEventRequest}
            edit={true}
            initialValues={mapEventInfoToFormData(event.result)}
          />
        )}
        {asyncRequestIsLoading(event) && <Spin />}
        {asyncRequestIsFailed(event) && (
          <Alert
            message="Error"
            description={event.error.message}
            type="error"
            showIcon
          />
        )}
      </ContentContainer>
    </>
  );
};

export default EditEventContainer;