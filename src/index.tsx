import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { UserState } from './auth/ducks/types';
import authClient, { AuthClient } from './auth/authClient';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import userReducer, { initialUserState } from './auth/ducks/reducers';
import { ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { UserAuthenticationActions } from './auth/ducks/actions';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

export interface C4CState {
  authenticationState: UserState;
}

export type C4CAction = UserAuthenticationActions;

interface ThunkExtraArgs {
  readonly authClient: AuthClient;
}

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
});

const storeState: C4CState = {
  authenticationState: initialUserState,
};

const thunkExtraArgs: ThunkExtraArgs = {
  authClient,
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

const store = createStore<C4CState, C4CAction, {}, {}>(
  reducers,
  storeState,
  enhancer,
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
