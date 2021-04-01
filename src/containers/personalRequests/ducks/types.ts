import { ThunkAction } from 'redux-thunk';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { PersonalRequestsActions } from './actions';

export interface PersonalRequestsReducerState {
    readonly personalRequests: AsyncRequest<PersonalRequest[], any>;
}

export type PersonalRequestsThunkAction<R> = ThunkAction<
    R,
    C4CState,
    ProtectedApiExtraArgs,
    PersonalRequestsActions
>;

export interface PersonalRequest {
    id: number,
    created: Date;
    status: string;
}
