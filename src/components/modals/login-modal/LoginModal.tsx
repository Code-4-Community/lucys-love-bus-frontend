import React, { useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import './login-modal.less';
import LoginContent from './LoginContent';
import ForgotPasswordContent from './ForgotPasswordContent';
import PasswordResetContent from './PasswordResetContent';

interface LoginModalProps {
  showLoginModal: boolean;
  onCloseLoginModal: () => void;
}

const StyledModal = styled(Modal)`
  border-radius: 33px;
  horiz-align: center;
  .ant-modal-content {
    height: 534px;
    border-radius: 33px;
  }
`;

const getModalContent = (
  currentPage: string,
  switchToForgotPasswordPage: () => void,
  switchToPasswordResetPage: () => void,
) => {
  switch (currentPage) {
    case 'login':
      return (
        <LoginContent switchToForgotPasswordPage={switchToForgotPasswordPage} />
      );
    case 'forgotPassword':
      return (
        <ForgotPasswordContent
          switchToConfirmationPage={switchToPasswordResetPage}
        />
      );
    case 'passwordReset':
      return <PasswordResetContent />;
  }
};

const LoginModal = (props: LoginModalProps) => {
  const [currentPage, setPage] = useState('login');

  const setToForgotPasswordPage = () => {
    setPage('forgotPassword');
  };

  const setToPasswordResetPage = () => {
    setPage('passwordReset');
  };

  return (
    <div className="modal">
      <StyledModal
        visible={props.showLoginModal}
        footer={null}
        onCancel={props.onCloseLoginModal}
        width={'625px'}
      >
        {getModalContent(
          currentPage,
          setToForgotPasswordPage,
          setToPasswordResetPage,
        )}
      </StyledModal>
    </div>
  );
};

export default LoginModal;
