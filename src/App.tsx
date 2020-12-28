import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.less';
import Home from './containers/home/Home';
import Settings from './containers/settings/Settings';
import BlockTemplate from './containers/template-1-col-block/Template';
import GridTemplate from './containers/template-24-col-grid/Template';
import NotFound from './containers/not-found/NotFound';
import NavBar from './components/navbar';
import Footer from './components/Footer';
import UpcomingEvents from './containers/upcoming-events/UpcomingEvents';
import SignupFlow from './containers/signupFlow';
import { Layout } from 'antd';
import styled from 'styled-components';
const { Content } = Layout;

const FullScreenLayout = styled(Layout)`
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="C4C,code,for,community,code4community,codeforcommunity,northeastern,boston"
        />
      </Helmet>

      <Router>
        <FullScreenLayout>
          <NavBar />
          <Content>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/block-template" exact component={BlockTemplate} />
              <Route path="/grid-template" exact component={GridTemplate} />
              <Route path="/signup" component={SignupFlow} />
              <Route path="/upcoming-events" exact component={UpcomingEvents} />
              <Route path="/settings" exact component={Settings} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Content>
          <Footer />
        </FullScreenLayout>
      </Router>
    </>
  );
};

export default App;
