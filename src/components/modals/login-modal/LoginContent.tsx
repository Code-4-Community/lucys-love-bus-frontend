import { Button, Form, Input } from 'antd';
import React from 'react';
import './login-content.less';
import Text from 'antd/es/typography/Text';

interface Props {
  switchToForgotPasswordPage: () => void;
}

const LoginContent: (props: Props) => JSX.Element = (props: Props) => {
  const forgotPasswordLink = (
    <Button onClick={props.switchToForgotPasswordPage} className="page-link" type="link">
      here
    </Button>
  );
  const signUpLink = <Button className="page-link">here</Button>;

  return (
    <div className="content">
      <Text className="title-text">Login to your account</Text>
      <Form.Item name="username" rules={[{ required: true }]} className="email-field">
        <Input className="input-style" placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]} className="password-field">
        <Input.Password className="input-style" placeholder="Password" />
      </Form.Item>
      <Button className="login-button" type="primary">
        Sign In
      </Button>
      <Text className="forgot-password-text">Forgot password? Click {forgotPasswordLink}</Text>
      <Text className="sign-up-text">Don’t have an account? Sign up {signUpLink}</Text>
    </div>
  );
};

export default LoginContent;
