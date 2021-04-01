import { PersonalRequest } from './types';

export const hasPendingRequest = (requests: PersonalRequest[]): boolean => {
    return !!requests.find(request => request.status === 'PENDING');
};
