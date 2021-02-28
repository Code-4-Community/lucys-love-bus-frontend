import React from 'react';
import EventListing from '../event-listing/EventListing';
import { EventProps } from '../../containers/upcoming-events/ducks/types';

export interface EventsListProps {
  readonly events: EventProps[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <div className="cards">
      {events.map((event, i) => (
        <EventListing {...event} key={i} />
      ))}
    </div>
  );
};

export default EventsList;
