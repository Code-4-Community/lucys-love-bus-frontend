import { setContacts as settingContacts } from './actions';
import { SetContactsRequest, SetContactsThunkAction } from './types';
import { C4CState, LOCALSTORAGE_STATE_KEY } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';

export const setContacts = (
    contactInfo: SetContactsRequest,
): SetContactsThunkAction<void> => {
    return (dispatch, getState, { protectedApiClient }): Promise<void> => {
        dispatch(settingContacts.loading());
        return protectedApiClient
            .setContacts(contactInfo)
            .catch((error) => {
                dispatch(settingContacts.failed(error.response.data));
            })
    };
};