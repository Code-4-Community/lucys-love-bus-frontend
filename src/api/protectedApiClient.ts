import AppAxiosInstance from '../auth/axios';
import { PersonalRequest } from '../containers/personalRequests/ducks/types';
import { EventAnnouncement } from '../containers/singleEvent/ducks/types';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly getRequestStatuses: () => Promise<PersonalRequest[]>;
  readonly makePFRequest: () => Promise<void>;
  readonly deactivateAccount: () => Promise<void>;
  readonly getEventAnnouncements: (
    eventId: number,
  ) => Promise<EventAnnouncement[]>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  REQUEST_STATUSES = '/api/v1/protected/requests/status',
  MAKE_PF_REQUEST = 'api/v1/protected/requests',
  USER = '/api/v1/protected/user',
  ANNOUNCEMENTS = 'api/v1/protected/announcements',
}

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const deactivateAccount = (): Promise<void> => {
  return AppAxiosInstance.delete(ProtectedApiClientRoutes.USER)
    .then((res) => res)
    .catch((err) => err);
};

const getRequestStatuses = (): Promise<PersonalRequest[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.REQUEST_STATUSES)
    .then((res) => res.data)
    .catch((err) => err);
};

const makePFRequest = (): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_PF_REQUEST)
    .then(() => {})
    .catch((err) => err);
};

const getEventAnnouncements = (
  eventId: number,
): Promise<EventAnnouncement[]> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.ANNOUNCEMENTS}/${eventId}`,
  )
    .then((res) => res.data?.announcements)
    .catch((err) => err);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  getRequestStatuses,
  makePFRequest,
  deactivateAccount,
  getEventAnnouncements,
});

export default Client;
