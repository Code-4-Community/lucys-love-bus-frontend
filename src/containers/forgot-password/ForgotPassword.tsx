import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography } from 'antd';
import authClient from '../../auth/authClient';
import { ForgotPasswordRequest } from '../../auth/ducks/types';

const { Title } = Typography;

const ForgotPassword: React.FC = () => {
  const onFinish = (values: ForgotPasswordRequest) => {
    authClient
      .forgotPassword(values)
      .then(() => {
        alert('Successfully sent forgot password request!');
      })
      .catch((err) => {
        alert('Forgot password request unsuccessful!');
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
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
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

export default ForgotPassword;
