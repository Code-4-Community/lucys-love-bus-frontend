import AppAxiosInstance from '../auth/axios';
import { AxiosResponse } from 'axios';
import { Registration } from '../containers/eventRSVP/ducks/types';
import { PersonalRequest } from '../containers/personalRequests/ducks/types';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;

  readonly registerTickets: (request: {
    lineItemRequests: [
      {
        eventId: number;
        quantity: number;
      },
    ];
  }) => Promise<AxiosResponse<any>>;
  readonly getRequestStatuses: () => Promise<PersonalRequest[]>;
  readonly makePFRequest: () => Promise<void>;
  readonly deactivateAccount: () => Promise<void>;
  readonly getEventRegistrations: (eventId: number) => Promise<Registration[]>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  REGISTER_TICKETS = '/api/v1/protected/checkout/register',
  REQUEST_STATUSES = '/api/v1/protected/requests/status',
  MAKE_PF_REQUEST = 'api/v1/protected/requests',
  USER = '/api/v1/protected/user',
  EVENTS = 'api/v1/protected/events',
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

const registerTickets = (request: {
  lineItemRequests: [
    {
      eventId: number;
      quantity: number;
    },
  ];
}) => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.REGISTER_TICKETS,
    request,
  );
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
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_PF_REQUEST).catch(
    (err) => err,
  );
};

const getEventRegistrations: (eventId: number) => Promise<Registration[]> = (
  eventId: number,
) => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.EVENTS}/${eventId}/registrations`,
  ).then((res) => res.data.registrations);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  registerTickets,
  getRequestStatuses,
  makePFRequest,
  deactivateAccount,
  getEventRegistrations,
});

export default Client;
