import React, { useState } from 'react';
import EventListing from '../event-listing/EventListing';
import { EventProps } from '../../containers/upcoming-events/ducks/types';
import styled from 'styled-components';

export interface EventsListProps {
  readonly events: EventProps[];
}

const PageNumbersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageNumber = styled.li`
  font-size: 30px;
  list-style-type: none;
  margin: 1rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [eventsPerPage, setEventsPerPage] = useState<number>(3);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const renderTodos = currentEvents.map((event, i) => (
    <EventListing {...event} key={i} />
  ));

  const handlePageClick = (event: any) => {
    setCurrentPage(event.target.id);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <PageNumber key={number} id={number.toString()} onClick={handlePageClick}>
        {number}
      </PageNumber>
    );
  });

  return (
    <div>
      <div className="cards">{renderTodos}</div>
      <PageNumbersWrapper>{renderPageNumbers}</PageNumbersWrapper>
    </div>
  );
};

export default EventsList;
