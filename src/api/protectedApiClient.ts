import AppAxiosInstance from '../auth/axios';
import { ChangeEmailRequest } from '../containers/changeAccountEmail/ducks/types';
import { PersonalRequest } from '../containers/personalRequests/ducks/types';

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
  readonly changeAccountEmail: (request: ChangeEmailRequest) => Promise<void>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  REQUEST_STATUSES = '/api/v1/protected/requests/status',
  MAKE_PF_REQUEST = 'api/v1/protected/requests',
  USER = '/api/v1/protected/user',
  CHANGE_EMAIL = '/api/v1/protected/user/change_email',
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

const changeAccountEmail = (request: ChangeEmailRequest): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.CHANGE_EMAIL, request);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  getRequestStatuses,
  makePFRequest,
  deactivateAccount,
  changeAccountEmail,
});

export default Client;
