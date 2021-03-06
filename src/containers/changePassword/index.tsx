import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import ProtectedApiClient from '../../api/protectedApiClient';
import FormContainer from '../../components/FormContainer';

const { Title } = Typography;

export interface ChangePasswordRequestData {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordFormData extends ChangePasswordRequestData {
  confirm: string;
}

const ChangePassword: React.FC = () => {
  const onFinishChangePassword = (values: ChangePasswordFormData) => {
    ProtectedApiClient.changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
      .then((res) => res)
      .catch((e) => e);
  };

  return (
    <>
      <Helmet>
        <title>Change Password</title>
        <meta
          name="description"
          content="Change your password for Lucy's Love Bus programs."
        />
      </Helmet>
      <FormContainer>
        <Title>Change Password</Title>

        <Form name="basic" layout="vertical" onFinish={onFinishChangePassword}>
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
                  if (!value || getFieldValue('newPassword') === value) {
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
      </FormContainer>
    </>
  );
};

export default ChangePassword;
