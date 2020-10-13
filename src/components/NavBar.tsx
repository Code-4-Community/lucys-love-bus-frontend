import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu, Dropdown, Image, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Text } = Typography;

const NavBar: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const path: string = location.pathname;

  function pathnameToKey(pathname: string) {
    switch (pathname) {
      case '/':
        return '1';
      case '/block-template':
        return '2';
      case '/grid-template':
        return '3';
      default:
        return '1';
    }
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="4">Change Primary Account Email</Menu.Item>
      <Menu.Item key="5">Account Details</Menu.Item>
      <Menu.Item key="6">Change Password</Menu.Item>
      <Menu.Item key="7">Deactivate Account</Menu.Item>
    </Menu>
  );
  const logoPath = '/logo.jpg';

  return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[pathnameToKey(path)]}
        style={{padding: 15}}
      >
        <Image width={90} height={90} src={logoPath} alt={"LLB Logo"} style={{marginLeft: 80}}/>
        <Text strong >Lucy's Love Bus Event Registration</Text>
        <Menu.Item 
          key="1"
          onClick={() => {
            history.push('/');
          }}
          style={{marginLeft: 80}}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            history.push('/block-template');
          }}
          style={{marginLeft: 80}}
        >
          Upcoming Events
        </Menu.Item>
        <Menu.Item
            key="3"
            onClick={() => {
              history.push('/grid-template');
            }}
            style={{marginLeft: 80}}
          >
          My Events
        </Menu.Item>
        <Menu.SubMenu 
          title={<span> <UserOutlined /> John Smith</span>}
          style={{float: "right", paddingTop: "inherit"}}
        >
          {userMenu}
        </Menu.SubMenu>
      </Menu>
    // <Menu
    //     mode="horizontal"
    //     defaultSelectedKeys={[pathnameToKey(path)]}
    //     style={{padding: 15}}
    //   >
    //     <Menu.Item key="0">
    //       <Image width={90} height={90} src={logoPath} alt={"LLB Logo"}/>
    //     </Menu.Item>
    //     <Menu.Item 
    //       key="1"
    //       onClick={() => {
    //         history.push('/');
    //       }}
    //     >
    //       Home
    //     </Menu.Item>
    //     <Menu.Item
    //       key="2"
    //       onClick={() => {
    //         history.push('/block-template');
    //       }}
    //     >
    //       Upcoming Events
    //     </Menu.Item>
    //     <Menu.Item
    //         key="3"
    //         onClick={() => {
    //           history.push('/grid-template');
    //         }}
    //       >
    //       My Events
    //     </Menu.Item>
    //     <Menu.SubMenu 
    //       title={<span> <UserOutlined /> John Smith</span>}
          
    //     >
    //       {userMenu}
    //     </Menu.SubMenu>
    //   </Menu>
    // <Header style={{ background: "white" }}>
      // <Menu
      //   mode="horizontal"
      //   defaultSelectedKeys={[pathnameToKey(path)]}
      // >        
        
      //   <Menu.Item
      //     key="0"
      //     onClick={() => {
      //       history.push('/');
      //     }}
      //     style={{padding: 10}}
      //   >
      //     <Image width={90} height={90} src={logoPath} />
      //   </Menu.Item>

      //   {/* <Menu.Item>
      //     <p>Hello <br/> Hello</p>
      //   </Menu.Item> */}
        

      //   <Menu.Item
      //     key="1"
      //     onClick={() => {
      //       history.push('/');
      //     }}
      //   >
      //     Home
      //   </Menu.Item>  

      //   <Menu.Item
      //     key="2"
      //     onClick={() => {
      //       history.push('/block-template');
      //     }}
      //   >
      //     Upcoming Events
      //   </Menu.Item>

      //     <Menu.Item
      //       key="3"
      //       onClick={() => {
      //         history.push('/grid-template');
      //       }}
      //     >
      //       My Events
      //     </Menu.Item>
      //   {/* <Dropdown overlay={userMenu}>
          
      //   </Dropdown> */}
        
      // </Menu>
    // </Header>
  );
};

export default NavBar;
