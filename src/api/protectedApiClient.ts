import AppAxiosInstance from '../auth/axios';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly decactivateAccount: () => Promise<void>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  USER = '/api/v1/protected/user'
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

const decactivateAccount = (): Promise<void> => {
  return AppAxiosInstance.delete(
    ProtectedApiClientRoutes.USER
  )
    .then((r) => r)
    .catch((e) => e);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  decactivateAccount
});

export default Client;
