import React from 'react';
import EventListing from '../event-listing/EventListing';
import { EventProps } from '../../containers/upcoming-events/ducks/types';

const EventsList: React.FC = () => {
  // mock data to use for now
  const event1: EventProps = {
    title: 'Event 1',
    date: new Date(2020, 11, 18),
    time: '3:00PM',
    description: 'This is a test event',
  };
  const event2: EventProps = {
    title: 'Event 2',
    date: new Date(2020, 11, 18),
    time: '3:00PM',
    description: 'Here is another test event',
    thumbnail:
      'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/events/segwege_thumbnail.jpeg',
  };
  const event3: EventProps = {
    title: 'Event 3',
    date: new Date(2020, 11, 21),
    time: '3:00PM',
    description: 'Yet another test event',
  };
  const events: EventProps[] = [event1, event2, event3];

  return (
    <div className="cards">
      {events.map((event, i) => (
        <EventListing {...event} key={i} />
      ))}
    </div>
  );
};

export default EventsList;
