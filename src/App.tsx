import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './components/Home';
import ExamplePage from './components/ExamplePage';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

import { ThemeProvider } from '@material-ui/core';

import theme from './theme';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Helmet>
          <meta
            name="keywords"
            content="C4C,code,for,community,code4community,codeforcommunity,northeastern,boston"
          />
        </Helmet>

        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/example" exact component={ExamplePage} />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
