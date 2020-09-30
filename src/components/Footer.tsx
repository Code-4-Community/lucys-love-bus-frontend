import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const NavBar: React.FC = () => {
  const history = useHistory();
  return <Footer>Footer goes here!</Footer>;
};

export default NavBar;
