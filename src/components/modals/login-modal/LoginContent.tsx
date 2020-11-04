import { Button, Form, Input } from 'antd';
import React from 'react';
import './login-content.less';

interface Props {
  switchToForgotPasswordPage: () => void;
}

const LoginContent: (props: Props) => JSX.Element = (props: Props) => {
  const forgotPasswordLink = (
    <p onClick={props.switchToForgotPasswordPage} className="page-link">
      here
    </p>
  );

  const signUpLink = <a className="page-link">here</a>; // eslint-disable-line no-eval

  return (
    <p>
      <div className="content">
        <div className="title-text">Login to your account</div>
        <div className="email-field">
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input className="input-style" placeholder="Email" />
          </Form.Item>
        </div>

        <div className="password-field">
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password className="input-style" placeholder="Password" />
          </Form.Item>
        </div>
        <Button className="login-button" type="primary">
          Sign In
        </Button>
        <div className="forgot-password-text">
          Forgot password? Click {forgotPasswordLink}
        </div>
        <div className="sign-up-text">
          Don’t have an account? Sign up {signUpLink}
        </div>
      </div>
    </p>
  );
};

export default LoginContent;
