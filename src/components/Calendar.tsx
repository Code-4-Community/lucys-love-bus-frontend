import { Badge, Calendar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EventProps } from '../containers/upcoming-events/ducks/types';
import { LINK } from '../utils/colors';

const EventsCalendarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  .ant-badge-status {
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ant-badge-status-text {
    transition: color 300ms;
  }
  .ant-badge-status-text :hover {
    color: ${LINK};
  }
`;

interface CalendarData {
  eventId: number;
  type: 'success' | 'warning' | 'error' | 'default' | 'processing' | undefined;
  content: string;
}

/**
 * A loose interface for the Moment.js Moment objects used by AntD's calendar component.
 */
interface CalendarMoment {
  date: () => number;
  month: () => number;
  year: () => number;
}

interface CalendarProps {
  events: EventProps[];
}

type DatePredicate = (d: Date, moment: CalendarMoment) => boolean;

const matchesDateMonthYear: DatePredicate = (
  eventDate: Date,
  moment: CalendarMoment,
): boolean => {
  return (
    eventDate.getDate() === moment.date() &&
    eventDate.getMonth() === moment.month() &&
    eventDate.getFullYear() === moment.year()
  );
};

const matchesMonthYear: DatePredicate = (
  eventDate: Date,
  moment: CalendarMoment,
): boolean => {
  return (
    eventDate.getMonth() === moment.month() &&
    eventDate.getFullYear() === moment.year()
  );
};

const CalendarComponent: React.FC<CalendarProps> = ({ events }) => {
  function getListData(
    moment: CalendarMoment,
    datePredicate: DatePredicate,
  ): CalendarData[] {
    const listData: CalendarData[] = events
      .filter((e) => {
        const eventDate = new Date(e.details.start);
        return datePredicate(eventDate, moment);
      })
      .map((e) => {
        return { eventId: e.id, type: 'success', content: e.title };
      });

    return listData;
  }

  function renderEventList(listData: CalendarData[]): JSX.Element {
    return (
      <EventsCalendarList>
        {listData.map((item) => (
          <li key={item.content}>
            <Link to={`/events/${item.eventId}`}>
              <Badge status={item.type} text={item.content} />
            </Link>
          </li>
        ))}
      </EventsCalendarList>
    );
  }

  /**
   * Candler date cell render handler required by AntD. Takes in a
   * CalendarMoment (really a Moment.js object) that represents
   * a Date. Given that date, conditionally renders the
   * appropriate events for that day.
   *
   * @param moment
   */
  function dateCellRender(moment: CalendarMoment): JSX.Element {
    const listData = getListData(moment, matchesDateMonthYear);
    return renderEventList(listData);
  }

  /**
   * Candler month cell render handler required by AntD. Takes in a
   * CalendarMoment (really a Moment.js object) that represents
   * a Date. Given that date, conditionally renders the
   * appropriate events for that month.
   *
   * @param moment
   */
  function monthCellRender(moment: CalendarMoment): JSX.Element {
    const listData = getListData(moment, matchesMonthYear);
    return renderEventList(listData);
  }

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default CalendarComponent;
