import { Badge, Calendar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LINK } from '../colors';
import { EventProps } from '../containers/upcoming-events/ducks/types';

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

interface CalendarProps {
  events: EventProps[];
}

const matchesDateMonthYear = (eventDate: Date, value: any): boolean => {
  return (
    eventDate.getDate() === value.date() &&
    eventDate.getMonth() === value.month() &&
    eventDate.getFullYear() === value.year()
  );
};

const matchesMonthYear = (eventDate: Date, value: any): boolean => {
  return (
    eventDate.getMonth() === value.month() &&
    eventDate.getFullYear() === value.year()
  );
};

const CalendarComponent: React.FC<CalendarProps> = ({ events }) => {
  function getListData(
    value: any,
    datePredicate: (d: Date, moment: any) => boolean,
  ): CalendarData[] {
    const listData: CalendarData[] = events
      .filter((e) => {
        const eventDate = new Date(e.details.start);
        return datePredicate(eventDate, value);
      })
      .map((e) => {
        return { eventId: e.id, type: 'success', content: e.title };
      });

    return listData;
  }

  function dateCellRender(value: any) {
    const listData = getListData(value, matchesDateMonthYear);
    return renderEventList(listData);
  }

  function monthCellRender(value: any) {
    const listData = getListData(value, matchesMonthYear);
    return renderEventList(listData);
  }

  function renderEventList(listData: CalendarData[]) {
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

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default CalendarComponent;
