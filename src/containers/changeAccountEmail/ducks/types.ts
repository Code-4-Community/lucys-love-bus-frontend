import { ThunkAction } from 'redux-thunk';
import { ApiExtraArgs } from '../../../api/apiExtraArgs';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { ChangeAccountEmailActions } from './actions';

export interface ChangeAccountEmailReducerState {
    readonly changeAccountEmail: AsyncRequest<void, any>;
}

export type ChangeAccountEmailThunkAction<R> = ThunkAction<
    R,
    C4CState,
    ApiExtraArgs,
    ChangeAccountEmailActions
>;
