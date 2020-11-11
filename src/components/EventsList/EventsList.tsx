import React from 'react';
import './events-list.less';
import EventListing from '../../components/EventListing/EventListing';

// placeholder interface for now (will replace with real interface once hooked up to db)
interface Event {
  title: string;
  date: string;
  description: string;
  otherNotes?: string;
  // TODO: use correct file type
  thumbnail?: any;
}

const EventsList: React.FC = () => {
  const onFinish = (values: any) => {
    // send data to redux
  };

  // mock data to use for now
  const event1: Event = {title: 'Event 1', date: '11/15/20', description: 'This is a test event'};
  const event2: Event = {title: 'Event 2', date: '11/18/20', description: 'This is another test event'};
  const events: Event[] = [event1, event2];
  
  return (
    <div className="cards">
      {events.map(e => 
        <EventListing event={ e }/>
      )}
    </div>
  );
};

export default EventsList;
