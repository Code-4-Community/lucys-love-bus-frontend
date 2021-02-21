import { Layout } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.less';
import { getPrivilegeLevel } from './auth/ducks/selectors';
import { PrivilegeLevel } from './auth/ducks/types';
import NavBar from './components/navbar';
import Home from './containers/home';
import Login from './containers/login';
import NotFound from './containers/notFound/';
import Settings from './containers/settings';
import SignupFlow from './containers/signupFlow';
import SingleEvent from './containers/single-event/SingleEvent';
import UpcomingEvents from './containers/upcoming-events/UpcomingEvents';
import { C4CState } from './store';


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
  EVENT = "/event/:id"
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
                        <Route
                          path={Routes.SIGNUP}
                          exact
                          component={SignupFlow}
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
                        <Route
                          path={Routes.SIGNUP}
                          exact
                          component={SignupFlow}
                        />
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
