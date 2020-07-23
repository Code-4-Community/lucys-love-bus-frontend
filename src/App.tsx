import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './components/Home';
import ExamplePage from './components/ExamplePage';
import NotFound from './components/NotFound';

import { AppBar, Tabs, Tab, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#6C4087',
      // dark: will be calculated from palette.primary.main,
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#C71C5B',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    text: {
      //primary: '',
      //secondary: ''
    },
  },
  typography: {
    h1: {
      fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
    },
    h2: {
      fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
    },
    h3: {
      fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
    },
    h4: {
      fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
    },
  },
});

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
          <AppBar position="static" color="transparent">
            <Tabs value={false} variant="scrollable" scrollButtons="auto">
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Other Example Page" component={Link} to="/example" />
            </Tabs>
          </AppBar>
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
