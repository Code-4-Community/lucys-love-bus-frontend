import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Routes } from '../../App';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestCompleted, AsyncRequestFailed, asyncRequestIsComplete, asyncRequestIsFailed, asyncRequestIsLoading, asyncRequestIsNotStarted, AsyncRequestLoading, AsyncRequestNotStarted } from '../../utils/asyncRequest';
import { NewEventInformation } from '../createEvent/ducks/types';
import EventsForm, { EventsFormInitialValues } from '../../components/EventsForm';
import FormInitialText from '../../components/FormInitialText';
import { Alert, Spin, Typography } from 'antd';
import { editEvent } from '../createEvent/ducks/thunks';
import { EventsFormData } from '../../components/EventsForm'
import { EventInformation } from '../upcoming-events/ducks/types';
import { indexOf } from 'lodash';
import protectedApiClient from '../../api/protectedApiClient'
import moment from 'moment';

interface EditEventProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const { Title } = Typography;

interface SingleEventParams {
  id: string;
}

const EditEventContainer: React.FC<EditEventProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = Number(useParams<SingleEventParams>().id);

  // if (asyncRequestIsComplete(tokens)) {
  //   history.push(`/events/${id}`);
  // }

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

  const onFinish = async (data: EventsFormData) => {
    dispatch(
      editEvent(id, {
        title: data.title,
        capacity: data.capacity,
        thumbnail: data.thumbnail,
        price: data.price,
        details: {
          description: data.description,
          location: data.location,
          start: data.start,
          end: data.end,
        }
      }),
    );
  };

  const mapEventInfoToFormData = (info: EventInformation): EventsFormInitialValues => {
    return {
      title: info.title,
      capacity: info.capacity,
      thumbnail: info.thumbnail,
      price: info.price,
      description: info.details.description,
      location: info.details.location,
      start: moment(info.details.start),
      end: moment(info.details.end),
    }
  }

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
          tokens={tokens} 
          edit={true}
          initialValues={mapEventInfoToFormData(event.result)} />
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

const mapStateToProps = (state: C4CState): EditEventProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(EditEventContainer);
