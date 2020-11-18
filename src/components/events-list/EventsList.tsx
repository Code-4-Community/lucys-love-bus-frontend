import React from 'react';
import EventListing from '../event-listing/EventListing';

// placeholder interface for now (will replace with real interface once hooked up to db)
interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
  otherNotes?: string;
  // TODO: use correct file type
  thumbnail?: string;
}

const EventsList: React.FC = () => {

  // mock data to use for now
  const event1: Event = {title: 'Event 1', date: '11/15/20', time: '3:00PM', description: 'This is a test event'};
  const event2: Event = {title: 'Event 2', date: '11/18/20', time: '3:00PM', description: 'Here is another test event', thumbnail: 'https://lucys-love-bus-public.s3.us-east-2.amazonaws.com/events/segwege_thumbnail.jpeg'};
  const event3: Event = {title: 'Event 3', date: '11/21/20', time: '3:00PM', description: 'Yet another test event'};
  const events: Event[] = [event1, event2, event3];
  
  return (
    <div className="cards">
      {events.map(e => 
        <EventListing event={ e }/>
      )}
    </div>
  );
};

export default EventsList;
