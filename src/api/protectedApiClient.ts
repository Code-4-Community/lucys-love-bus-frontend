import AppAxiosInstance from '../auth/axios';
import { AnnouncementFormData } from '../components/AnnouncementForm';
import { UserSummary } from '../components/UserInfoTable';
import { ChangeEmailRequest } from '../containers/changeAccountEmail/ducks/types';
import { Registration } from '../containers/eventRSVP/ducks/types';
import { PersonalRequest } from '../containers/personalRequests/ducks/types';
import { ContactInfo } from '../containers/setContacts/ducks/types';
import { EventAnnouncement } from '../containers/singleEvent/ducks/types';
import { EventInformation } from '../containers/upcoming-events/ducks/types';
import { NewEventInformation } from '../containers/createEvent/ducks/types';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface PFRequest {
  id: string;
  user: User;
}

export interface PFRequestResponse {
  requests: PFRequest[];
}

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
  readonly getPFRequests: () => Promise<PFRequestResponse>;
  readonly approvePFRequest: (requestId: number) => Promise<void>;
  readonly denyPFRequest: (requestId: number) => Promise<void>;
  readonly getRequestContactInfoById: (
    requestId: number,
  ) => Promise<ContactInfo>;
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
  readonly createEvent: (
    request: NewEventInformation,
  ) => Promise<EventInformation>;
  readonly editEvent: (
    id: number,
    request: NewEventInformation,
  ) => Promise<EventInformation>;
  readonly getEventInfoById: (id: number) => Promise<EventInformation>;
  readonly deleteEvent: (id: number) => Promise<void>;
  readonly createAnnouncement: (
    request: AnnouncementFormData,
    eventId?: number,
  ) => Promise<void>;
  readonly deleteAnnouncement: (id: number) => Promise<void>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  REGISTER_TICKETS = '/api/v1/protected/checkout/register',
  REQUEST_STATUSES = '/api/v1/protected/requests/status',
  PF_REQUESTS = 'api/v1/protected/requests',
  APPROVE_PF_REQUEST = 'api/v1/protected/requests/:request_id/approve',
  DENY_PF_REQUEST = 'api/v1/protected/requests/:request_id/reject',
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
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.EVENTS}/signed_up`,
  ).then((res) => res.data.events);
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
  return AppAxiosInstance.post(ProtectedApiClientRoutes.PF_REQUESTS)
    .then((res) => {
      return;
    })
    .catch((err) => err);
};

const getPFRequests = (): Promise<PFRequestResponse> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.PF_REQUESTS).then(
    (res) => res.data,
  );
};

const approvePFRequest = (requestId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.APPROVE_PF_REQUEST.replace(
      ':request_id',
      String(requestId),
    ),
  );
};

const denyPFRequest = (requestId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.DENY_PF_REQUEST.replace(
      ':request_id',
      String(requestId),
    ),
  );
};

const getRequestContactInfoById = (requestId: number): Promise<ContactInfo> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.PF_REQUESTS}/${requestId}`,
  ).then((res) => res.data);
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

const createEvent = (
  request: NewEventInformation,
): Promise<EventInformation> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.EVENTS, request)
    .then((res) => res.data)
    .catch((err) => err);
};

const editEvent = (
  id: number,
  request: NewEventInformation,
): Promise<EventInformation> => {
  return AppAxiosInstance.put(
    `${ProtectedApiClientRoutes.EVENTS}/${id}`,
    request,
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const getEventInfoById = (id: number): Promise<EventInformation> => {
  return AppAxiosInstance.get(`${ProtectedApiClientRoutes.EVENTS}/${id}`).then(
    (res) => ({
      ...res.data,
      start: new Date(res.data.start),
      end: new Date(res.data.end),
    }),
  );
};

const deleteEvent = (id: number): Promise<void> => {
  return AppAxiosInstance.delete(
    `${ProtectedApiClientRoutes.EVENTS}/${id}`,
  ).catch((err) => err);
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
  getPFRequests,
  approvePFRequest,
  denyPFRequest,
  getRequestContactInfoById,
  deactivateAccount,
  getEventAnnouncements,
  getContactInfo,
  setContactInfo,
  changeAccountEmail,
  getEventRegistrations,
  getContactInfoById,
  createEvent,
  editEvent,
  getEventInfoById,
  deleteEvent,
  getAllUsersContactInfo,
  createAnnouncement,
  deleteAnnouncement,
});

export default Client;
