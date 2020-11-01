import React from 'react';
import './event-listing.less';
import { Card } from 'antd';

// placeholder interface for now (will replace with real interface once hooked up to db)
interface Event {
  title: string;
  date: string;
  description: string;
  otherNotes?: string;
  // TODO: use correct file type
  thumbnail?: any;
}

const EventListing: React.FC = () => {
  const onFinish = (values: Event) => {
    // send data to redux
  };

  return (
    <Card title="Title">
      <p>Card content</p>
    </Card>
  );
};

export default EventListing;
