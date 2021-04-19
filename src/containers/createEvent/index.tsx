import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import ProtectedApiClient from '../../api/protectedApiClient'
import { NewEventInformation } from './ducks/types';
import EventsForm from '../../components/EventsForm';
import FormInitialText from '../../components/FormInitialText';
import { Typography } from 'antd';
import { createEvent } from './ducks/thunks';

interface CreateEventProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const { Title } = Typography;

const CreateEventContainer: React.FC<CreateEventProps> = ({
  tokens,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

//   if (asyncRequestIsComplete(tokens)) {
//       history.push(Routes.UPCOMING_EVENTS);
//   }

  const onFinish = async (data: NewEventInformation) => {
    dispatch(createEvent({
            title: data.title,
            spotsAvailable: data.spotsAvailable,
            capacity: data.capacity,
            thumbnail: data.thumbnail,
            price: data.price,
            details: data.details
        }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Create Event</title>
        <meta
          name="description"
          content="Create a new Event"
        />
      </Helmet>
      <ContentContainer>
        <FormInitialText>
          <Title level={3}>Create an Event</Title>
        </FormInitialText>
        <EventsForm
          onFinish={onFinish}
          tokens={tokens}
          edit={false}
        />
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
