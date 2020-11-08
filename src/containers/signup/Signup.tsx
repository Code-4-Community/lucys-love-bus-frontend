import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { signup } from '../../auth/ducks/thunks';
import { useDispatch } from 'react-redux';
const { Title, Paragraph } = Typography;

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(
      signup({
        username: values.username,
        email: values.email,
        password: values.password,
        fullName: `${values.firstName} ${values.lastName}`,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        {/*
          Place relevant components in here
        */}
        <Title>Sign Up</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Paragraph>
            Already have an account? Log in{' '}
            <Link to="/login" component={Typography.Link}>
              here
            </Link>
            !
          </Paragraph>

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

export default Signup;
