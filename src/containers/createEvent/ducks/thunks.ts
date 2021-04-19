import { CreateEventThunkAction, NewEventInformation } from './types';
import { create, edit, deleteEvent } from './actions';
import { EventInformation } from '../../upcoming-events/ducks/types';

export const createEvent = (
    createEventRequest: NewEventInformation,
): CreateEventThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(create.loading());
    return protectedApiClient
      .eventCreate(createEventRequest)
      .then((response: EventInformation) => {
        dispatch(create.loaded(response));
      })
      .catch((error: any) => {
        dispatch(create.failed(error));
      });
  };
};

export const editEvent = (
    id: number,
    editEventRequest: NewEventInformation,
): CreateEventThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(edit.loading());
    return protectedApiClient
      .eventEdit(id, editEventRequest)
      .then((response: EventInformation) => {
        dispatch(edit.loaded(response));
      })
      .catch((error: any) => {
        dispatch(edit.failed(error));
      });
  };
};

export const deleteAnEvent = (
    id: number,
): CreateEventThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(deleteEvent.loading());
    return protectedApiClient
      .eventDelete(id)
      .then(() => {})
      .catch((error: any) => {
        dispatch(deleteEvent.failed(error));
      });
  };
};
