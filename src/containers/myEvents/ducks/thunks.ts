import { MyEventProps, MyEventsThunkAction } from './types';
import { myEvents } from './actions';

export const getMyEvents = (): MyEventsThunkAction<void> => {
    return (dispatch, getState, { protectedApiClient } ) => {
        dispatch(myEvents.loading());
        return protectedApiClient
            .getMyEvents()
            .then((response: MyEventProps[]) => {
                dispatch(myEvents.loaded(response));
            })
            .catch((error: any) => {
                dispatch(myEvents.failed(error));
            });
    };
};
