import AppAxiosInstance from '../auth/axios';
import { SetContactsRequest } from '../auth/ducks/types';

export interface ProtectedApiClient {
  readonly setContacts: (contactInfo: SetContactsRequest) => Promise<void>;
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  SET_CONTACTS = '/api/v1/protected/user/contact_info/',
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

const setContacts: (contactInfo: SetContactsRequest) => Promise<void> = (
  contactInfo: SetContactsRequest,
) =>
  AppAxiosInstance.post(ProtectedApiClientRoutes.SET_CONTACTS, contactInfo, {});

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  setContacts,
});

export default Client;
