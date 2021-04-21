import AppAxiosInstance from '../auth/axios';
import { AnnouncementFormData } from '../components/AnnouncementForm';
import { UserSummary } from '../components/UserInfoTable';
import { ChangeEmailRequest } from '../containers/changeAccountEmail/ducks/types';
import { Registration } from '../containers/eventRSVP/ducks/types';
import { PersonalRequest } from '../containers/personalRequests/ducks/types';
import { ContactInfo } from '../containers/setContacts/ducks/types';
import { EventAnnouncement } from '../containers/singleEvent/ducks/types';
import { EventInformation } from '../containers/upcoming-events/ducks/types';

interface LineItem {
  eventId: number;
  quantity: number;
}

interface RegisterTicketsRequest {
  lineItemRequests: LineItem[];
}

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly registerTickets: (request: RegisterTicketsRequest) => Promise<void>;
  readonly getMyEvents: () => Promise<EventInformation[]>;
  readonly getRequestStatuses: () => Promise<PersonalRequest[]>;
  readonly makePFRequest: () => Promise<void>;
  readonly deactivateAccount: () => Promise<void>;
  readonly getEventAnnouncements: (
    eventId: number,
  ) => Promise<EventAnnouncement[]>;
  readonly getContactInfo: () => Promise<ContactInfo>;
  readonly getContactInfoById: (id: number) => Promise<ContactInfo>;
  readonly getAllUsersContactInfo: () => Promise<UserSummary[]>;
  readonly setContactInfo: (request: ContactInfo) => Promise<void>;
  readonly changeAccountEmail: (request: ChangeEmailRequest) => Promise<void>;
  readonly getEventRegistrations: (eventId: number) => Promise<Registration[]>;
  readonly createAnnouncement: (
    request: AnnouncementFormData,
    eventId?: number,
  ) => Promise<void>;
  readonly deleteAnnouncement: (id: number) => Promise<void>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  REGISTER_TICKETS = '/api/v1/protected/checkout/register',
  MY_EVENTS = '/api/v1/protected/events/signed_up',
  REQUEST_STATUSES = '/api/v1/protected/requests/status',
  MAKE_PF_REQUEST = 'api/v1/protected/requests',
  USER = '/api/v1/protected/user',
  ANNOUNCEMENTS = 'api/v1/protected/announcements',
  CONTACT_INFO = '/api/v1/protected/user/contact_info',
  CHANGE_EMAIL = '/api/v1/protected/user/change_email',
  EVENTS = 'api/v1/protected/events',
  USER_DIRECTORY = 'api/v1/protected/user/user-directory',
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

const registerTickets = (request: RegisterTicketsRequest) => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.REGISTER_TICKETS,
    request,
  ).then((res) => {
    return;
  });
};

const getMyEvents = (): Promise<EventInformation[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.MY_EVENTS).then(
    (res) => res.data.events,
  );
};
const deactivateAccount = (): Promise<void> => {
  return AppAxiosInstance.delete(ProtectedApiClientRoutes.USER)
    .then((res) => res)
    .catch((err) => err);
};

const getContactInfo = (): Promise<ContactInfo> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.CONTACT_INFO).then(
    (res) => res.data,
  );
};

const getContactInfoById = (id: number): Promise<ContactInfo> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.CONTACT_INFO}/${id}`,
  ).then((res) => res.data);
};
const getAllUsersContactInfo = (): Promise<UserSummary[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.USER_DIRECTORY).then(
    (res) => res.data.users,
  );
};

const setContactInfo = (request: ContactInfo): Promise<void> => {
  return AppAxiosInstance.put(ProtectedApiClientRoutes.CONTACT_INFO, request);
};

const getRequestStatuses = (): Promise<PersonalRequest[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.REQUEST_STATUSES)
    .then((res) => res.data)
    .catch((err) => err);
};

const makePFRequest = (): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_PF_REQUEST)
    .then((res) => {
      return;
    })
    .catch((err) => err);
};

const getEventAnnouncements = (
  eventId: number,
): Promise<EventAnnouncement[]> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.ANNOUNCEMENTS}/${eventId}`,
  )
    .then((res) => res.data.announcements)
    .catch((err) => err);
};

const changeAccountEmail = (request: ChangeEmailRequest): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.CHANGE_EMAIL, request);
};

const getEventRegistrations: (eventId: number) => Promise<Registration[]> = (
  eventId: number,
) => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.EVENTS}/${eventId}/registrations`,
  ).then((res) => res.data.registrations);
};

const createAnnouncement = (
  request: AnnouncementFormData,
  eventId?: number,
): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.ANNOUNCEMENTS +
      (eventId !== undefined ? `/${eventId}` : ''),
    request,
  );
};

const deleteAnnouncement = (id: number): Promise<void> => {
  return AppAxiosInstance.delete(
    `${ProtectedApiClientRoutes.ANNOUNCEMENTS}/${id}`,
  );
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  registerTickets,
  getMyEvents,
  getRequestStatuses,
  makePFRequest,
  deactivateAccount,
  getEventAnnouncements,
  getContactInfo,
  setContactInfo,
  changeAccountEmail,
  getEventRegistrations,
  getContactInfoById,
  getAllUsersContactInfo,
  createAnnouncement,
  deleteAnnouncement,
});

export default Client;
