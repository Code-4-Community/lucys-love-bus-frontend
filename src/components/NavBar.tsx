import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" color="transparent">
      <Tabs value={false} variant="scrollable" scrollButtons="auto">
        <Tab label="Home" component={Link} to="/" />
        <Tab label="Other Example Page" component={Link} to="/example" />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
