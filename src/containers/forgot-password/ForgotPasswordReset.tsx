import React from 'react';
import { Helmet } from 'react-helmet';
import {useParams} from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import authClient from '../../auth/authClient';

const { Title } = Typography;

const ForgotPasswordReset: React.FC = () => {
  const { key } = useParams();

  // gotta change this
  const onFinish = (values: any) => {
    authClient.forgotPasswordReset({secretKey: key, newPassword: values.password});
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
            rules={[{ required: true, message: 'Please enter your new password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your new password!' }]}
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
