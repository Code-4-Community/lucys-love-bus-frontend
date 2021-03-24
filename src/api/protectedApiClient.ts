import AppAxiosInstance from '../auth/axios';
import { MyEventProps } from '../containers/myEvents/ducks/types';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;

  readonly getMyEvents: () => Promise<MyEventProps[]>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  MY_EVENTS = '/api/v1/protected/events/signed_up',
}

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r)
    .catch((e) => e);
};

const getMyEvents = (): Promise<MyEventProps[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.MY_EVENTS)
    .then((r) => r.data?.events)
    .catch((e) => e);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  getMyEvents,
});

export default Client;
