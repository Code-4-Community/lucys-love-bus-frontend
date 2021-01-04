import React from 'react';
import EventListing from '../event-listing/EventListing';
import { EventProps } from '../../containers/upcoming-events/ducks/types';

const EventsList: React.FC = () => {
  // mock data to use for now
  const event1: EventProps = {
    title: 'Dolphins and Massage!',
    date: new Date('2020/12/12'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
    src:
      'https://mymodernmet.com/wp/wp-content/uploads/2020/12/how-to-draw-a-dolphin-large-thumbnail-1.jpg',
  };
  const event2: EventProps = {
    title: 'VIRTUAL Barn Babies',
    date: new Date('2020/11/28'),
    description:
      'Find some time for self-care and join yoga teacher Sarah Oleson for a peaceful and rejuvenating virtual restorative yoga session! Find a comfortable spot and grab a mat and a blanket and/or bolster. Open to all abilities. ',
    src:
      'https://img.apmcdn.org/de59f2dc867d1c2a8bb59503661fbee0c95f3e53/uncropped/680ab2-20170324-babyfarmanimals-17.jpg',
  };
  const event3: EventProps = {
    title: 'Default Event',
    date: new Date('2020/11/18'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  };
  const events: EventProps[] = [event1, event2, event3];

  return (
    <div className="cards">
      {events.map((event, i) => (
        <EventListing {...event} key={i} />
      ))}
    </div>
  );
};

export default EventsList;
