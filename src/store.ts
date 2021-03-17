import {
  UserAuthenticationExtraArgs,
  UserAuthenticationReducerState,
} from './auth/ducks/types';
import { UserAuthenticationActions } from './auth/ducks/actions';
import authClient from './auth/authClient';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import userReducer, { initialUserState } from './auth/ducks/reducers';
import { ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import AppAxiosInstance from './auth/axios';
import { asyncRequestIsComplete } from './utils/asyncRequest';
import publicApiClient, { PublicApiExtraArgs } from './api/publicApiClient';
import { EventsReducerState } from './containers/upcoming-events/ducks/types';
import { EventsActions } from './containers/upcoming-events/ducks/actions';
import eventsReducer, {
  initialEventsState,
} from './containers/upcoming-events/ducks/reducers';
import protectedApiClient, {
  ProtectedApiExtraArgs,
} from './api/protectedApiClient';

export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  eventsState: EventsReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction = UserAuthenticationActions | EventsActions;

export type ThunkExtraArgs = UserAuthenticationExtraArgs & PublicApiExtraArgs & ProtectedApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  eventsState: eventsReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  eventsState: initialEventsState,
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
  protectedApiClient
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
