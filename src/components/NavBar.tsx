import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const NavBar: React.FC = () => {
  const history = useHistory();
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item
          key="1"
          onClick={() => {
            history.push('/');
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            history.push('/block-template');
          }}
        >
          Block Template
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            history.push('/grid-template');
          }}
        >
          Grid Template
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavBar;
