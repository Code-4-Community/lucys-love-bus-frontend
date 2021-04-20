import { Layout } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { getPrivilegeLevel } from './auth/ducks/selectors';
import { PrivilegeLevel } from './auth/ducks/types';
import BugReportFooter from './components/BugReportFooter';
import NavBar from './components/navbar';
import Announcements from './containers/announcements';
import ChangeAccountEmail from './containers/changeAccountEmail';
import DeactivateAccount from './containers/deactivateAccount';
import EventRSVP from './containers/eventRSVP';
import FamilyDetails from './containers/familyDetails';
import ForgotPassword from './containers/forgotPasswordRequest';
import ForgotPasswordReset from './containers/forgotPasswordReset';
import Home from './containers/home';
import MyEvents from './containers/myEvents';
import NotFound from './containers/notFound/';
import PersonalRequests from './containers/personalRequests';
import SetContacts from './containers/setContacts';
import Settings from './containers/settings';
import Signup from './containers/signup';
import SignupConfirmation from './containers/signupConfirmation';
import SignupFormContainer from './containers/signupForm';
import SingleEvent from './containers/singleEvent';
import UpcomingEvents from './containers/upcoming-events';
import UserDirectory from './containers/userDirectory';
import VerifyEmail from './containers/verifyEmail';
import { C4CState } from './store';

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
  MY_EVENTS = '/my-events',
  PERSONAL_REQUESTS = '/personal-requests',
  EDIT_FAMILY_INFO = '/edit-family-information',
  DEACTIVATE_ACCOUNT = '/deactivate-account',
  SET_CONTACTS = '/set-contacts',
  SIGNUP_CONFIRMATION = '/signup/confirmation',
  CHANGE_ACCOUNT_EMAIL = '/change-email',
  EVENT_REGISTRATIONS = '/events/:id/rsvp',
  FAMILY_DETAILS = '/family-details/:id',
  USER_DIRECTORY = '/user-directory',
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
                      <Route
                        path={Routes.VERIFY_EMAIL}
                        exact
                        component={VerifyEmail}
                      />
                      <Route
                        path={Routes.PERSONAL_REQUESTS}
                        exact
                        component={PersonalRequests}
                      />
                      <Route
                        path={Routes.EVENT_REGISTRATIONS}
                        exact
                        component={EventRSVP}
                      />
                      <Route
                        path={Routes.SET_CONTACTS}
                        exact
                        component={SetContacts}
                      />
                      <Route
                        path={Routes.FAMILY_DETAILS}
                        exact
                        component={FamilyDetails}
                      />
                      <Route
                        path={Routes.USER_DIRECTORY}
                        exact
                        component={UserDirectory}
                      />
                      <Route
                        path={Routes.MY_EVENTS}
                        exact
                        component={MyEvents}
                      />
                      <Route path="*" exact component={NotFound} />
                    </Switch>
                  );
                case PrivilegeLevel.STANDARD:
                case PrivilegeLevel.PF:
                  return (
                    <Switch>
                      <Route path={Routes.HOME} exact component={Home} />
                      <Route
                        path={Routes.UPCOMING_EVENTS}
                        exact
                        component={UpcomingEvents}
                      />
                      <Route
                        path={Routes.MY_EVENTS}
                        exact
                        component={MyEvents}
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
                      <Route
                        path={Routes.VERIFY_EMAIL}
                        exact
                        component={VerifyEmail}
                      />
                      <Route
                        path={Routes.SET_CONTACTS}
                        exact
                        component={SetContacts}
                      />
                      <Route
                        path={Routes.SIGNUP_CONFIRMATION}
                        exact
                        component={SignupConfirmation}
                      />
                      <Route
                        path={Routes.PERSONAL_REQUESTS}
                        exact
                        component={PersonalRequests}
                      />
                      <Route
                        path={Routes.CHANGE_ACCOUNT_EMAIL}
                        exact
                        component={ChangeAccountEmail}
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
        <BugReportFooter />
      </Router>
    </>
  );
};

export default App;
