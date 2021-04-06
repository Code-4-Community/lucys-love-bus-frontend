import AppAxiosInstance from '../auth/axios';
import { AxiosResponse } from 'axios';

export interface ApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

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
  readonly deactivateAccount: () => Promise<void>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  REGISTER_TICKETS = '/api/v1/protected/checkout/register',
  USER = '/api/v1/protected/user',
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

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  registerTickets,
  deactivateAccount,
});

export default Client;
