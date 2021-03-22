import AppAxiosInstance from '../auth/axios';
import { Announcement } from '../containers/announcements/ducks/types';
import { EventProps } from '../containers/upcoming-events/ducks/types';

export interface PublicApiExtraArgs {
  readonly publicApiClient: PublicApiClient;
}

export interface PublicApiClient {
  readonly getUpcomingEvents: () => Promise<EventProps[]>;
  readonly getAnnouncements: () => Promise<Announcement[]>;
}

enum PublicApiClientRoutes {
  UPCOMING_EVENTS = '/api/v1/events',
  ANNOUNCEMENTS = '/api/v1/announcements',
}

const getUpcomingEvents = (): Promise<EventProps[]> => {
  return AppAxiosInstance.get(PublicApiClientRoutes.UPCOMING_EVENTS).then(
    (response) => response.data?.events,
  );
};

const getAnnouncements = (): Promise<Announcement[]> => {
  return AppAxiosInstance.get(PublicApiClientRoutes.ANNOUNCEMENTS).then(
    (response) => response.data?.announcements,
  );
};

const Client: PublicApiClient = Object.freeze({
  getUpcomingEvents,
  getAnnouncements,
});

export default Client;
