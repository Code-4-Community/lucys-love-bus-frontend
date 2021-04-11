import { C4CAction } from '../../../store';
import {
  AsyncRequestNotStarted,
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { contacts, setContacts } from './actions';
import { ContactInfo, ContactsReducerState } from './types';

export const initialContactsState: ContactsReducerState = {
  contacts: AsyncRequestNotStarted<ContactInfo, any>(),
  setContacts: AsyncRequestNotStarted<void, any>(),
};

const contactsReducer = generateAsyncRequestReducer<
  ContactsReducerState,
  ContactInfo,
  void
>(contacts.key);

const setContactsReducer = generateAsyncRequestReducer<
  ContactsReducerState,
  void,
  void
>(setContacts.key);

const reducers = (
  state: ContactsReducerState = initialContactsState,
  action: C4CAction,
): ContactsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        contacts: contactsReducer(state.contacts, action),
        setContacts: setContactsReducer(state.setContacts, action),
      };
    default:
      return state;
  }
};

export default reducers;
