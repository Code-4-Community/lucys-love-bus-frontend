import { CreateEventThunkAction, NewEventInformation } from './types';
import { createEvent, editEvent, deleteEvent } from './actions';
import { EventInformation } from '../../upcoming-events/ducks/types';

export const createAnEvent = (
  createEventRequest: NewEventInformation,
): CreateEventThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(createEvent.loading());
    return protectedApiClient
      .eventCreate(createEventRequest)
      .then((response: EventInformation) => {
        dispatch(createEvent.loaded(response));
      })
      .catch((error: any) => {
        dispatch(createEvent.failed(error));
      });
  };
};

export const editAnEvent = (
  id: number,
  editEventRequest: NewEventInformation,
): CreateEventThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(editEvent.loading());
    return protectedApiClient
      .eventEdit(id, editEventRequest)
      .then((response: EventInformation) => {
        dispatch(editEvent.loaded(response));
      })
      .catch((error: any) => {
        dispatch(editEvent.failed(error));
      });
  };
};

export const deleteAnEvent = (id: number): CreateEventThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(deleteEvent.loading());
    return protectedApiClient
      .eventDelete(id)
      .then(() => {
        dispatch(deleteEvent.loaded(undefined));
      })
      .catch((error: any) => {
        dispatch(deleteEvent.failed(error));
      });
  };
};

export const clearEventRequest = (): CreateEventThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(deleteEvent.loading());
    dispatch(createEvent.loading());
    dispatch(editEvent.loading());
  };
};