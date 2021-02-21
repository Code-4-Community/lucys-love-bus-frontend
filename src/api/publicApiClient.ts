import AppAxiosInstance from '../auth/axios';
import { EventProps } from '../containers/upcoming-events/ducks/types';

export interface ApiExtraArgs {
  readonly protectedApiClient: PublicApiClient;
}

export interface PublicApiClient {
  readonly getUpcomingEvents: () => Promise<EventProps[]>;
}

enum PublicApiClientRoutes {
  UPCOMING_EVENTS = '/api/v1/events',
}

const getUpcomingEvents = (): Promise<EventProps[]> => {
  return AppAxiosInstance.get(PublicApiClientRoutes.UPCOMING_EVENTS).then(
    (response) => response.data?.events,
  );
};

const Client: PublicApiClient = Object.freeze({
  getUpcomingEvents,
});

export default Client;
