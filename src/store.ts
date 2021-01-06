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
import tokenService from './auth/token';
import protectedApiClient, { ApiExtraArgs } from './api/protectedApiClient';
import { EventsReducerState } from './containers/upcoming-events/ducks/types';
import { EventsActions } from './containers/upcoming-events/ducks/actions';
import eventsReducer, {
  initialEventsState,
} from './containers/upcoming-events/ducks/reducers';

export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  eventsState: EventsReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction = UserAuthenticationActions & EventsActions;

export type ThunkExtraArgs = UserAuthenticationExtraArgs & ApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  eventsState: eventsReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  eventsState: initialEventsState,
};

const thunkExtraArgs: ThunkExtraArgs = {
  authClient,
  tokenService,
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
>(reducers, initialStoreState, enhancer);

export default store;
