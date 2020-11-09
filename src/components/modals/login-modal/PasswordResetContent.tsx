import React from 'react';
import './password-reset-content.less';
import {Button} from 'antd';
import Text from 'antd/es/typography/Text';

const PasswordResetContent: () => JSX.Element = () => {
  const resendEmailLink = <Button className="resend-email-page-link" type="link">click here</Button>;

  return (
    <div className="content">
      <Text className="password-reset-title-text">Your password reset link is on the way!</Text>
      <Text className="password-reset-text">
        Keep an eye on your inbox (and check your spam folder as well). If you
        still haven’t received an email, {resendEmailLink} to resend it
      </Text>
    </div>
  );
};

export default PasswordResetContent;
