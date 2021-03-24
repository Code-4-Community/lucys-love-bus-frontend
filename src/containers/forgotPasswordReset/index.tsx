import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, Input, Typography, Alert } from 'antd';
import authClient from '../../auth/authClient';
import { Routes } from '../../App';

const { Title } = Typography;

interface NewPasswords {
  readonly password: string;
  readonly confirmPassword: string;
}

const ForgotPasswordReset: React.FC = () => {
  const { key } = useParams<{key: string}>();
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  const onFinish = (values: NewPasswords) => {
    authClient
      .forgotPasswordReset({ secretKey: key, newPassword: values.password })
      .then(() => {
        setError(false);
        history.push(Routes.HOME);
      })
      .catch((err) => {
        setError(true);
      });
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

        {error && <Alert message={'Password reset failed'} type="error" />}
      </div>
    </>
  );
};

export default ForgotPasswordReset;
