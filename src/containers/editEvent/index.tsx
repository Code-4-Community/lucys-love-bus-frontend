import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Routes } from '../../App';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { NewEventInformation } from '../createEvent/ducks/types';
import EventsForm from '../../components/EventsForm';
import FormInitialText from '../../components/FormInitialText';
import { Typography } from 'antd';
import { editEvent } from '../createEvent/ducks/thunks';

interface EditEventProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const { Title } = Typography;

interface SingleEventParams {
    id: string;
  }
  
const EditEventContainer: React.FC<EditEventProps> = ({
  tokens,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = Number(useParams<SingleEventParams>().id);

  if (asyncRequestIsComplete(tokens)) {
      history.push(`/events/${id}`);
  }

  const onFinish = async (data: NewEventInformation) => {
    dispatch(editEvent(id, {
            title: data.title,
            spotsAvailable: data.spotsAvailable,
            capacity: data.capacity,
            thumbnail: data.thumbnail,
            price: data.price,
            details: data.details,
        }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Edit Event</title>
        <meta
          name="description"
          content="Edit an existing Event"
        />
      </Helmet>
      <ContentContainer>
        <FormInitialText>
          <Title level={3}>Edit Event</Title>
        </FormInitialText>
        <EventsForm
          onFinish={onFinish}
          tokens={tokens}
          edit={true}
        />
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
