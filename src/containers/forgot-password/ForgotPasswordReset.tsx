import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import authClient from '../../auth/authClient';

const { Title } = Typography;

interface NewPasswords {
  readonly password: string;
  readonly confirmPassword: string;
}

const ForgotPasswordReset: React.FC = () => {
  const { key } = useParams();

  const onFinish = (values: NewPasswords) => {
    if (values.password.length < 8) {
      alert('New password is too weak. Must be at least 8 characters long.');
    } else if (values.password !== values.confirmPassword) {
      alert("Passwords don't match");
    } else {
      authClient
        .forgotPasswordReset({ secretKey: key, newPassword: values.password })
        .then(() => {
          alert('Successfully reset password!');
        })
        .catch((err) => {
          alert('Was not able to reset password.');
        });
    }
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
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your new password!' },
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
