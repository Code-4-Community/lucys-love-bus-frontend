import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import Settings from './containers/settings';
import NotFound from './containers/notFound';
import NavBar from './components/navbar';
import { Layout } from 'antd';
import styled from 'styled-components';
import { PrivilegeLevel } from './auth/ducks/types';
import { C4CState } from './store';
import { getPrivilegeLevel } from './auth/ducks/selectors';
import { useSelector } from 'react-redux';
import UpcomingEvents from './containers/upcoming-events/UpcomingEvents';
import SignupFlow from './containers/signupFlow';

const { Content } = Layout;

const AppInnerContainer = styled(Layout)`
  min-height: 100vh;
`;

export enum Routes {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  SETTINGS = '/settings',
  UPCOMING_EVENTS = '/upcoming-events',
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
        <Layout>
          <NavBar />
          <Content>
            <AppInnerContainer>
              {(() => {
                switch (privilegeLevel) {
                  case PrivilegeLevel.ADMIN:
                  case PrivilegeLevel.STANDARD:
                    return (
                      <Switch>
                        <Route path={Routes.HOME} exact component={Home} />
                        <Route path={Routes.SIGNUP} exact component={SignupFlow} />
                        <Route path={Routes.LOGIN} exact component={Login} />
                        <Route
                          path={Routes.UPCOMING_EVENTS}
                          exact
                          component={UpcomingEvents}
                        />
                        <Route
                          path={Routes.SETTINGS}
                          exact
                          component={Settings}
                        />
                        <Route path="*" exact component={NotFound} />
                      </Switch>
                    );
                  case PrivilegeLevel.NONE:
                    return (
                      <Switch>
                        <Route path={Routes.HOME} exact component={Home} />
                        <Route path={Routes.SIGNUP} exact component={SignupFlow} />
                        <Route path={Routes.LOGIN} exact component={Login} />
                        <Route
                          path={Routes.UPCOMING_EVENTS}
                          exact
                          component={UpcomingEvents}
                        />
                        <Route path="*" exact component={NotFound} />
                      </Switch>
                    );
                }
              })()}
            </AppInnerContainer>
          </Content>
        </Layout>
      </Router>
    </>
  );
};

export default App;
