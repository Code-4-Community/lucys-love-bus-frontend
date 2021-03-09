import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Typography, Alert } from 'antd';
import authClient from '../../auth/authClient';

const { Title } = Typography;

interface NewPasswords {
  readonly password: string;
  readonly confirmPassword: string;
}

const ForgotPasswordReset: React.FC = () => {
  const { key } = useParams();

  const onFinish = (values: NewPasswords) => {
    authClient
      .forgotPasswordReset({ secretKey: key, newPassword: values.password })
      .then(() => {
        window.location.href = '/';
      })
      .catch((err) => {
        alert('Was not able to reset password.');
      });
    // TODO: handle error case better,
    //  store passwordResetError boolean in state and when it is true, render an AntD alert
  };
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Forgot Password</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              {
                min: 8,
                message:
                  'New password is too weak. Must be at least 8 characters long.',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ForgotPasswordReset;
