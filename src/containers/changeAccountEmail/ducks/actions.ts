import { genericAsyncActions } from '../../../utils/asyncRequest';

export const changeAccountEmail = genericAsyncActions<void, any>();

export type ChangeAccountEmailActions =
    | ReturnType<typeof changeAccountEmail.loading>
    | ReturnType<typeof changeAccountEmail.loaded>
    | ReturnType<typeof changeAccountEmail.failed>;
