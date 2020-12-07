import { Button, Form, Input } from 'antd';
import React from 'react';
import './forgot-password-content.less';
import styled from 'styled-components';
import Text from 'antd/es/typography/Text';

interface Props {
  switchToConfirmationPage: () => void;
}

const SendLinkButton = styled(Button)`
  position: absolute;
  height: 45px;
  width: 115px;
  left: 40.8%;
  top: 340px;
  background: #505050;
  border-radius: 6px;
`;

const ForgotPasswordContent: (props: Props) => JSX.Element = (props: Props) => {
  return (
    <div className="content">
      <Text className="forgot-password-title-text">Reset your password</Text>
      <Text className="subtitle-text">
        Enter email address associated with account
      </Text>
      <Text className="email-label">Email</Text>
      <Form.Item
        name="username"
        rules={[{ required: true }]}
        className="forgot-password-email-field"
      >
        <Input className="input-style" placeholder="Email" />
      </Form.Item>
      <SendLinkButton
        className="send-link-button"
        type="primary"
        onClick={props.switchToConfirmationPage}
      >
        Send Link
      </SendLinkButton>
    </div>
  );
};

export default ForgotPasswordContent;
