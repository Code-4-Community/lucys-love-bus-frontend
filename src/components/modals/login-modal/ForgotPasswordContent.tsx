import { Button, Form, Input } from 'antd';
import React from 'react';
import './forgot-password-content.less';

interface Props {
  switchToConfirmationPage: () => void;
}

const ForgotPasswordContent: (props: Props) => JSX.Element = (props: Props) => {
  return (
    <p>
      <div className="content">
        <div className="forgot-password-title-text">Reset your password</div>
        <div className="subtitle-text">
          Enter email address associated with account
        </div>
        <div className="email-label">Email</div>
        <div className="forgot-password-email-field">
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input className="input-style" placeholder="Email" />
          </Form.Item>
        </div>
        <Button
          className="send-link-button"
          type="primary"
          onClick={props.switchToConfirmationPage}
        >
          Send Link
        </Button>
      </div>
    </p>
  );
};

export default ForgotPasswordContent;
