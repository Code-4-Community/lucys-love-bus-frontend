import { ContactInfo, ContactsReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { upcomingEvents } from './actions';
import { C4CAction } from '../../../store';

export const initialContactsState: ContactsReducerState = {
  contacts: AsyncRequestNotStarted<ContactInfo[], any>(),
};

const contactsReducer = generateAsyncRequestReducer<
  ContactsReducerState,
  ContactInfo[],
  void
>(upcomingEvents.key);

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
      };
    default:
      return state;
  }
};

export default reducers;
