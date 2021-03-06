import { ThunkDispatch } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import thunk from 'redux-thunk';
import { MyEventsReducerState } from './containers/myEvents/ducks/types';
import { MyEventsActions } from './containers/myEvents/ducks/actions';
import myEventsReducer, {
  initialMyEventsState,
} from './containers/myEvents/ducks/reducers';
import protectedApiClient, {
  ProtectedApiExtraArgs,
} from './api/protectedApiClient';
import publicApiClient, { PublicApiExtraArgs } from './api/publicApiClient';
import authClient from './auth/authClient';
import AppAxiosInstance from './auth/axios';
import { UserAuthenticationActions } from './auth/ducks/actions';
import userReducer, { initialUserState } from './auth/ducks/reducers';
import {
  UserAuthenticationExtraArgs,
  UserAuthenticationReducerState,
} from './auth/ducks/types';
import { AnnouncementsActions } from './containers/announcements/ducks/actions';
import announcementsReducer, {
  initialAnnouncementsState,
} from './containers/announcements/ducks/reducers';
import { AnnouncementsReducerState } from './containers/announcements/ducks/types';
import deactivateAccountReducer, {
  initialDeactivateAccountState,
} from './containers/deactivateAccount/ducks/reducers';
import { DeactivateAccountReducerState } from './containers/deactivateAccount/ducks/types';
import { EventRegistrationsActions } from './containers/eventRSVP/ducks/actions';
import eventRegistrationsReducer, {
  initialEventRegistrationsState,
} from './containers/eventRSVP/ducks/reducers';
import { EventRegistrationsReducerState } from './containers/eventRSVP/ducks/types';
import { PersonalRequestsActions } from './containers/personalRequests/ducks/actions';
import personalRequestsReducer, {
  initialPersonalRequestsState,
} from './containers/personalRequests/ducks/reducers';
import { PersonalRequestsReducerState } from './containers/personalRequests/ducks/types';
import { ContactsActions } from './containers/setContacts/ducks/actions';
import contactsReducer, {
  initialContactsState,
} from './containers/setContacts/ducks/reducers';
import { ContactsReducerState } from './containers/setContacts/ducks/types';
import { EventsActions } from './containers/upcoming-events/ducks/actions';
import eventsReducer, {
  initialEventsState,
} from './containers/upcoming-events/ducks/reducers';
import { EventsReducerState } from './containers/upcoming-events/ducks/types';
import { asyncRequestIsComplete } from './utils/asyncRequest';
import { EventAnnouncementsActions } from './containers/singleEvent/ducks/actions';
import eventAnnouncementsReducer, {
  initialEventAnnouncementsState,
} from './containers/singleEvent/ducks/reducers';
import { EventAnnouncementsReducerState } from './containers/singleEvent/ducks/types';

export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  myEventsState: MyEventsReducerState;
  eventsState: EventsReducerState;
  announcementsState: AnnouncementsReducerState;
  personalRequestsState: PersonalRequestsReducerState;
  deactivateAccountState: DeactivateAccountReducerState;
  eventAnnouncementsState: EventAnnouncementsReducerState;
  contactsState: ContactsReducerState;
  eventRegistrationsState: EventRegistrationsReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction =
  | UserAuthenticationActions
  | EventsActions
  | MyEventsActions
  | AnnouncementsActions
  | ContactsActions
  | PersonalRequestsActions
  | EventAnnouncementsActions
  | EventRegistrationsActions;

export type ThunkExtraArgs = UserAuthenticationExtraArgs &
  PublicApiExtraArgs &
  ProtectedApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  myEventsState: myEventsReducer,
  eventsState: eventsReducer,
  announcementsState: announcementsReducer,
  personalRequestsState: personalRequestsReducer,
  deactivateAccountState: deactivateAccountReducer,
  eventAnnouncementsState: eventAnnouncementsReducer,
  contactsState: contactsReducer,
  eventRegistrationsState: eventRegistrationsReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  eventsState: initialEventsState,
  myEventsState: initialMyEventsState,
  announcementsState: initialAnnouncementsState,
  personalRequestsState: initialPersonalRequestsState,
  deactivateAccountState: initialDeactivateAccountState,
  eventAnnouncementsState: initialEventAnnouncementsState,
  contactsState: initialContactsState,
  eventRegistrationsState: initialEventRegistrationsState,
};

export const LOCALSTORAGE_STATE_KEY = 'state';

const loadStateFromLocalStorage = (): C4CState | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const state: C4CState = JSON.parse(serializedState);
    if (asyncRequestIsComplete(state.authenticationState.tokens)) {
      AppAxiosInstance.defaults.headers['X-Access-Token'] =
        state.authenticationState.tokens.result.accessToken;
    }
    return state;
  } catch (err) {
    return undefined;
  }
};

const preloadedState: C4CState | undefined = loadStateFromLocalStorage();

const thunkExtraArgs: ThunkExtraArgs = {
  authClient,
  publicApiClient,
  protectedApiClient,
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware<ThunkDispatch<C4CState, ThunkExtraArgs, C4CAction>>(
    thunk.withExtraArgument(thunkExtraArgs),
  ),
);

const store: Store<C4CState, C4CAction> = createStore<
  C4CState,
  C4CAction,
  {},
  {}
>(reducers, preloadedState || initialStoreState, enhancer);

store.subscribe(
  throttle(() => {
    const state: C4CState = store.getState();
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(LOCALSTORAGE_STATE_KEY, serializedState);
    } catch {
      // ignore write errors
    }
  }, 10000),
);

export default store;
