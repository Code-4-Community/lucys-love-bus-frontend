import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography } from 'antd';
import ProtectedApiClient from '../../api/protectedApiClient';

const { Title } = Typography;

const Settings: React.FC = () => {
  const onFinishChangePassword = (values: any) => {
    ProtectedApiClient.changePassword(values)
      .then((res) => res)
      .catch((e) => e);
  };

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Settings</Title>
        <Form name="basic">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Delete Account
            </Button>
          </Form.Item>
        </Form>

        <Form name="basic" onFinish={onFinishChangePassword}>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Settings;
