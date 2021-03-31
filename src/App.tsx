import { Layout } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/home';
import ForgotPassword from './containers/forgotPasswordRequest';
import ForgotPasswordReset from './containers/forgotPasswordReset';
import VerifyEmail from './containers/verifyEmail';
import NavBar from './components/navbar';
import styled from 'styled-components';
import { PrivilegeLevel } from './auth/ducks/types';
import NotFound from './containers/notFound/';
import Settings from './containers/settings';
import Signup from './containers/signup';
import SignupFormContainer from './containers/signupForm';
import SingleEvent from './containers/singleEvent';
import DeactivateAccount from './containers/deactivateAccount';
import UpcomingEvents from './containers/upcoming-events';
import Announcements from './containers/announcements';
import { useSelector } from 'react-redux';
import { C4CState } from './store';
import { getPrivilegeLevel } from './auth/ducks/selectors';

const { Content } = Layout;

const AppInnerContainer = styled(Layout)`
  min-height: 100vh;
`;

export enum Routes {
  HOME = '/',
  SIGNUP = '/signup',
  SIGNUP_FORM = '/signup/form',
  SETTINGS = '/settings',
  FORGOT_PASSWORD_REQUEST = '/forgot-password',
  FORGOT_PASSWORD_RESET = '/forgot-password-reset/:key',
  VERIFY_EMAIL = '/verify/:key',
  UPCOMING_EVENTS = '/upcoming-events',
  EVENT = '/events/:id',
  ANNOUNCEMENTS = '/announcements',
  DEACTIVATE_ACCOUNT = '/deactivate-account',
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
                        path={Routes.ANNOUNCEMENTS}
                        exact
                        component={Announcements}
                      />
                      <Route
                        path={Routes.SETTINGS}
                        exact
                        component={Settings}
                      />
                      <Route
                        path={Routes.DEACTIVATE_ACCOUNT}
                        exact
                        component={DeactivateAccount}
                      />
                      <Route
                        path={Routes.SIGNUP_FORM}
                        exact
                        component={SignupFormContainer}
                      />
                      <Route path="*" exact component={NotFound} />
                      <Route
                        path={Routes.VERIFY_EMAIL}
                        exact
                        component={VerifyEmail}
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
                        component={SignupFormContainer}
                      />
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
                        path={Routes.ANNOUNCEMENTS}
                        exact
                        component={Announcements}
                      />
                      <Route
                        path={Routes.DEACTIVATE_ACCOUNT}
                        exact
                        component={DeactivateAccount}
                      />
                      <Route
                        path={Routes.FORGOT_PASSWORD_REQUEST}
                        exact
                        component={ForgotPassword}
                      />
                      <Route
                        path={Routes.FORGOT_PASSWORD_RESET}
                        exact
                        component={ForgotPasswordReset}
                      />
                      <Route
                        path={Routes.VERIFY_EMAIL}
                        exact
                        component={VerifyEmail}
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
