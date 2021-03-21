import { Layout } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { getPrivilegeLevel } from './auth/ducks/selectors';
import { PrivilegeLevel } from './auth/ducks/types';
import NavBar from './components/navbar';
import Home from './containers/home';
import Login from './containers/login';
import NotFound from './containers/notFound/';
import Settings from './containers/settings';
import Signup from './containers/signup';
import SignupForm from './containers/signupForm';
import SingleEvent from './containers/singleEvent';
import UpcomingEvents from './containers/upcoming-events';
import { C4CState } from './store';

const { Content } = Layout;

const AppInnerContainer = styled(Layout)`
  min-height: 100vh;
`;

export enum Routes {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  SIGNUP_FORM = '/signup/form',
  SETTINGS = '/settings',
  UPCOMING_EVENTS = '/upcoming-events',
  EVENT = '/events/:id',
}

const App: React.FC = () => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="C4C,code,for,community,code4community,codeforcommunity,northeastern,boston"
        />
      </Helmet>

      <Router>
        <AppInnerContainer>
          <NavBar />
          <Content>
            {(() => {
              switch (privilegeLevel) {
                case PrivilegeLevel.ADMIN:
                case PrivilegeLevel.STANDARD:
                  return (
                    <Switch>
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route
                        path={Routes.UPCOMING_EVENTS}
                        exact
                        component={UpcomingEvents}
                      />
                      <Route
                        path={Routes.EVENT}
                        exact
                        component={SingleEvent}
                      />
                      <Route
                        path={Routes.SETTINGS}
                        exact
                        component={Settings}
                      />
                      <Route
                        path={Routes.SIGNUP_FORM}
                        exact
                        component={SignupForm}
                      />
                      <Route path="*" exact component={NotFound} />
                    </Switch>
                  );
                case PrivilegeLevel.NONE:
                  return (
                    <Switch>
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route path={Routes.SIGNUP} exact component={Signup} />
                      <Route
                        path={Routes.SIGNUP_FORM}
                        exact
                        component={SignupForm}
                      />
                      <Route path={Routes.LOGIN} exact component={Login} />
                      <Route
                        path={Routes.UPCOMING_EVENTS}
                        exact
                        component={UpcomingEvents}
                      />
                      <Route
                        path={Routes.EVENT}
                        exact
                        component={SingleEvent}
                      />
                      <Route path="*" exact component={NotFound} />
                    </Switch>
                  );
              }
            })()}
          </Content>
        </AppInnerContainer>
      </Router>
    </>
  );
};

export default App;
