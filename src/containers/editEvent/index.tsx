import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { ContentContainer } from '../../components';
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
import { EventsFormData } from '../../components/EventsForm';
import { EventInformation } from '../upcoming-events/ducks/types';
import protectedApiClient from '../../api/protectedApiClient';
import moment from 'moment';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';
import { Routes } from '../../App';

const { Title } = Typography;

interface SingleEventParams {
  id: string;
}

const EditEventContainer: React.FC = () => {
  const history = useHistory();
  const id = Number(useParams<SingleEventParams>().id);
  const [editEventRequest, setEditEventRequest] = useState<
    AsyncRequest<EventInformation, any>
  >(AsyncRequestNotStarted());

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
    history.push(Routes.EVENT_BASE_ROUTE + id);
  }

  const onFinish = async (data: EventsFormData) => {
    const eventPicture =
      data.thumbnail && (await encodeProfileFieldFile(data.thumbnail));

    let response: EventInformation | undefined;
    try {
      setEditEventRequest(AsyncRequestLoading());
      response = await protectedApiClient.editEvent(id, {
        title: data.title,
        capacity: data.capacity,
        thumbnail: eventPicture,
        price: data.price,
        details: {
          description: data.description,
          privateDescription: data.privateDescription,
          location: data.location,
          start: data.start,
          end: data.end,
        },
      });
      setEditEventRequest(AsyncRequestCompleted(response));
    } catch (err) {
      setEditEventRequest(AsyncRequestFailed(err));
    }
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
      privateDescription: info.details.privateDescription,
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
