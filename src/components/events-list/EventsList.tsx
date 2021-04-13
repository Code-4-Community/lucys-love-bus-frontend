import React from 'react';
import EventListing from '../event-listing/EventListing';\
import { EventInformation } from '../../containers/upcoming-events/ducks/types';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';

export interface EventsListProps {
  readonly events: EventInformation[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });
  const isAdmin = privilegeLevel === PrivilegeLevel.ADMIN;

  return (
    <div className="cards">
      {events.map((event, i) => (
        <EventListing {...event} admin={isAdmin} key={i} />
      ))}
    </div>
  );
};

export default EventsList;
