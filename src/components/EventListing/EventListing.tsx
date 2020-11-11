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

const EventListing: React.FC<{event: Event}> = ( props ) => {
  const onFinish = (values: Event) => {
    // send data to redux
  };

  return (
    <div className="flex-row">
      
      <Card className="card" title={ props.event.title }>
        <span>{ props.event.description }</span>
      </Card>
    </div>
    
  );
};

export default EventListing;
