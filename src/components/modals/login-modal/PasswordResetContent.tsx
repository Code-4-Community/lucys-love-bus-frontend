import React from 'react';
import './password-reset-content.less';

const PasswordResetContent: () => JSX.Element = () => {
  const resendEmailLink = <a className="page-link">click here</a>;

  return (
    <p>
      <div className="content">
        <div className="password-reset-title-text">
          Your password reset link is on the way!
        </div>
        <div className="password-reset-text">
          Keep an eye on your inbox (and check your spam folder as well). If you
          still haven’t received an email, {resendEmailLink} to resend it
        </div>
      </div>
    </p>
  );
};

export default PasswordResetContent;
