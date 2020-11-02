import React from 'react';
import { Helmet } from 'react-helmet';
import './settings.less';
import { Button, Form, Typography } from 'antd';
import { deleteAccount } from '../../auth/authAPI';
const { Title } = Typography;

const Settings: React.FC = () => {
  const onFinish = () => {
    deleteAccount();
  };

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Settings</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Delete Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Settings;
