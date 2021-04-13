import { contacts, setContacts } from './actions';
import { ContactInfo, ContactsThunkAction } from './types';

export const getContactInfo = (): ContactsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(contacts.loading());
    return protectedApiClient
      .getContactInfo()
      .then((response: ContactInfo) => {
        dispatch(contacts.loaded(response));
      })
      .catch((error: any) => {
        dispatch(contacts.failed(error));
      });
  };
};

export const setContactInfo = (
  request: ContactInfo,
): ContactsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(contacts.loading());
    dispatch(setContacts.loading());
    return protectedApiClient
      .setContactInfo(request)
      .then(() => {
        dispatch(contacts.loaded(request));
        dispatch(setContacts.loaded());
      })
      .catch((error) => {
        dispatch(contacts.failed(error));
        dispatch(setContacts.failed(error));
      });
  };
};

export const resetSetContactState = (): ContactsThunkAction<void> => {
  return (dispatch, getState, _) => {
    dispatch(setContacts.loading());
  };
};
