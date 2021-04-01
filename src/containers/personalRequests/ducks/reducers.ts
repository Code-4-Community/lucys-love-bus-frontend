import { PersonalRequest, PersonalRequestsReducerState } from './types';
import {
    ASYNC_REQUEST_FAILED_ACTION,
    ASYNC_REQUEST_LOADED_ACTION,
    ASYNC_REQUEST_LOADING_ACTION,
    AsyncRequestNotStarted,
    generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { personalRequests } from './actions';
import { C4CAction } from '../../../store';

export const initialPersonalRequestsState: PersonalRequestsReducerState = {
    personalRequests: AsyncRequestNotStarted<PersonalRequest[], any>(),
};

const personalRequestsReducer = generateAsyncRequestReducer<
    PersonalRequestsReducerState,
    PersonalRequest[],
    void
>(personalRequests.key);

const reducers = (
    state: PersonalRequestsReducerState = initialPersonalRequestsState,
    action: C4CAction,
): PersonalRequestsReducerState => {
    switch (action.type) {
        case ASYNC_REQUEST_LOADING_ACTION:
        case ASYNC_REQUEST_LOADED_ACTION:
        case ASYNC_REQUEST_FAILED_ACTION:
            return {
                ...state,
                personalRequests: personalRequestsReducer(state.personalRequests, action),
            };
        default:
            return state;
    }
};

export default reducers;
