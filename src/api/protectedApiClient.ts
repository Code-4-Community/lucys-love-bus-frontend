import { EventProps } from '../containers/upcoming-events/ducks/types';
import AppAxiosInstance from '../auth/axios';

export interface ApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient
}

export interface ProtectedApiClient {
  readonly getUpcomingEvents: () => Promise<EventProps[]>;
}

enum ProtectedApiClientRoutes {
  UPCOMING_EVENTS = '/api/v1/protected/events/qualified/',
}

const getUpcomingEvents = (): Promise<EventProps[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.UPCOMING_EVENTS).then(
    (response) => response.data.events,
  );
};

const Client: ProtectedApiClient = Object.freeze({
  getUpcomingEvents,
});

export default Client;
