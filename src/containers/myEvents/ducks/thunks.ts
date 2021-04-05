import { MyEventsThunkAction } from './types';
import { myEvents } from './actions';
import {EventInformation} from '../../upcoming-events/ducks/types';

export const getMyEvents = (): MyEventsThunkAction<void> => {
    return (dispatch, getState, { protectedApiClient } ) => {
        dispatch(myEvents.loading());
        return protectedApiClient
            .getMyEvents()
            .then((response: EventInformation[]) => {
                dispatch(myEvents.loaded(response));
            })
            .catch((error: any) => {
                dispatch(myEvents.failed(error));
            });
    };
};
