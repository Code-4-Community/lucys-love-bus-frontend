import { changeAccountEmail } from './actions';
import { ChangeAccountEmailThunkAction } from './types';

export const changePrimaryAccountEmail = (request: {
    newEmail: string;
    password: string;
}): ChangeAccountEmailThunkAction<void> => {
    return (dispatch, getState, { protectedApiClient }) => {
        dispatch(changeAccountEmail.loading());
        return protectedApiClient
            .changeAccountEmail(request)
            .then((response: any) => {
                dispatch(changeAccountEmail.loaded(response.requests));
            })
            .catch((error: any) => {
                dispatch(changeAccountEmail.failed(error));
            });
    };
};
