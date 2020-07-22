import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Home from './components/Home'
import ExamplePage from './components/ExamplePage'
import NotFound from './components/NotFound'

import { AppBar, Tabs, Tab } from '@material-ui/core'

const App = () => {
  return (
    <>
      <Helmet>
        <meta
          name='keywords'
          content='C4C,code,for,community,code4community,codeforcommunity,northeastern,boston'
        />
      </Helmet>

      <Router>
        <AppBar position='static' color='transparent'>
          <Tabs value={false} variant='scrollable' scrollButtons='auto'>
            <Tab label='Home' component={Link} to='/' />
            <Tab label='Other Example Page' component={Link} to='/example' />
          </Tabs>
        </AppBar>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/example' exact component={ExamplePage} />
          <Route path='*' exact component={NotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
