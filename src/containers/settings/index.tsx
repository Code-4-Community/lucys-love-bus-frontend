import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography } from 'antd';
import ProtectedApiClient from '../../api/protectedApiClient';
import { ContentContainer } from '../../components';

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
      <ContentContainer>
        <Title>Settings</Title>

        <Form name="basic" onFinish={onFinishChangePassword}>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: 'Please input your current password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!',
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </ContentContainer>
    </>
  );
};

export default Settings;
