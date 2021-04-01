import { PersonalRequest } from './types';

export const hasPendingRequest = (requests: PersonalRequest[]): boolean => {
  return requests.some((request) => request.status === 'PENDING');
};
