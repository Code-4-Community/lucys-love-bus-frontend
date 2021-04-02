import AppAxiosInstance from '../auth/axios';
import { ContactInfo } from '../containers/setContacts/ducks/types';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly deactivateAccount: () => Promise<void>;
  readonly getContactInfo: () => Promise<ContactInfo>,
  readonly setContactInfo: (request: ContactInfo) => Promise<void>,
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  USER = '/api/v1/protected/user',
  CONTACT_INFO = '/api/v1/protected/user/contact_info'
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

const getContactInfo = (): Promise<ContactInfo> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.CONTACT_INFO).then((res) => (res.data))
}

const setContactInfo = (request: ContactInfo): Promise<void> => {
  return AppAxiosInstance.put(ProtectedApiClientRoutes.CONTACT_INFO, request)
}


const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  deactivateAccount,
  getContactInfo,
  setContactInfo,
});

export default Client;
