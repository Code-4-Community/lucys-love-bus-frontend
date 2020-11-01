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

  const event1: Event = {title: 'Event 1', date: '11/15/20', description: 'This is a test event'};
  const events: Event[] = [event1];
  
  return (
    <div>
      {events.map(event => 
        <EventListing></EventListing>
      )}
    </div>
  );
};

export default EventsList;
