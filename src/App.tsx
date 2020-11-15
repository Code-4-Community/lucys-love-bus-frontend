import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Import antd stylesheets
import './App.less';
import Home from './containers/home/Home';
import BlockTemplate from './containers/template-1-col-block/Template';
import GridTemplate from './containers/template-24-col-grid/Template';

import NotFound from './containers/not-found/NotFound';
import NavBar from './components/navbar/NavBar';
import Footer from './components/Footer';
import { Layout } from 'antd';
import styled from 'styled-components';
const { Content } = Layout;

const AppInnerContainer = styled.div`
  min-height: 100vh;
`

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
        <Layout className="app-flex-container">
          <NavBar />
          <Content className="content-padding">
            <AppInnerContainer>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/block-template" exact component={BlockTemplate} />
                <Route path="/grid-template" exact component={GridTemplate} />
                <Route path="*" exact component={NotFound} />
              </Switch>
            </AppInnerContainer>
          </Content>
          <Footer />
        </Layout>
      </Router>
    </>
  );
};

export default App;
