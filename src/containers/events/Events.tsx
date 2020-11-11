import React from 'react';
import { Helmet } from 'react-helmet';
import './events.less';
import { Typography, Radio } from 'antd';
import EventsList from '../../components/EventsList/EventsList';

const { Title } = Typography;

const Events: React.FC = () => {

  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta name="Upcoming Events" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <div className="flex-row">
          <Title className="title">Upcoming Events</Title>
          <Radio.Group defaultValue="list">
            <Radio.Button value="list">List</Radio.Button>
            <Radio.Button value="calendar">Calendar</Radio.Button>
          </Radio.Group>
        </div>
        <EventsList></EventsList>
      </div>
    </>
  );
};

export default Events;
