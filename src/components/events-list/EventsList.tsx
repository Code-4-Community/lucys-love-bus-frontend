import React from 'react';
import EventListing from '../event-listing/EventListing';
import { EventInformation } from '../../containers/upcoming-events/ducks/types';

export interface EventsListProps {
  readonly events: EventInformation[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  // tslint:disable-next-line:no-console
  console.log(events);
  return (
    <div className="cards">
      {events.map((event, i) => (
        <EventListing {...event} key={i} />
      ))}{' '}
    </div>
  );
};

export default EventsList;
