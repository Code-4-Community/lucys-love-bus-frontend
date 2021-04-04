import { ChangeAccountEmailReducerState } from './types';
import {
    ASYNC_REQUEST_FAILED_ACTION,
    ASYNC_REQUEST_LOADED_ACTION,
    ASYNC_REQUEST_LOADING_ACTION,
    AsyncRequestNotStarted,
    generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { changeAccountEmail } from './actions';
import { C4CAction } from '../../../store';

export const initialChangeAccountEmailState: ChangeAccountEmailReducerState = {
    changeAccountEmail: AsyncRequestNotStarted<void, any>(),
};

const changeAccountEmailReducer = generateAsyncRequestReducer<
    ChangeAccountEmailReducerState,
    void,
    void
>(changeAccountEmail.key);

const reducers = (
    state: ChangeAccountEmailReducerState = initialChangeAccountEmailState,
    action: C4CAction,
): ChangeAccountEmailReducerState => {
    switch (action.type) {
        case ASYNC_REQUEST_LOADING_ACTION:
        case ASYNC_REQUEST_LOADED_ACTION:
        case ASYNC_REQUEST_FAILED_ACTION:
            return {
                ...state,
                changeAccountEmail: changeAccountEmailReducer(
                    state.changeAccountEmail,
                    action,
                ),
            };
        default:
            return state;
    }
};

export default reducers;
