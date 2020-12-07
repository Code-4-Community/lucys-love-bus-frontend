import React, { useState } from 'react';
import { Button, Form, Input, Modal, Typography } from 'antd';
import styled from 'styled-components';
import './login-modal.less';
import { login } from '../../../auth/ducks/thunks';
import { useDispatch } from 'react-redux';
import Text from 'antd/es/typography/Text';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  showLoginModal: boolean;
  onCloseLoginModal: () => void;
}

enum ModalContent {
  LoginContent,
  ForgotPassword,
  ResetPassword,
}

const StyledModal = styled(Modal)`
  horiz-align: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ForgotPasswordLinkButton = styled(Typography.Link)`
  color: black;
  white-space: nowrap;
  background-color: transparent;
  border: transparent;
  padding: 0px 0px 0px 0px;
`;

const ForgotPasswordText = styled(Text)`
  color: #000000;
`;

const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {
  const [currentPage, setPage] = useState<ModalContent>(
    ModalContent.LoginContent,
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const setToForgotPasswordPage = () => {
    setPage(ModalContent.ForgotPassword);
  };

  const setToPasswordResetPage = () => {
    setPage(ModalContent.ResetPassword);
  };

  const getModalContent = (
      currentPage: ModalContent,
      switchToForgotPasswordPage: () => void,
      switchToPasswordResetPage: () => void,
  ) => {
    switch (currentPage) {
      case ModalContent.LoginContent:
        return (
            <ContentDiv>
              <Input size={"large"} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <Input.Password size={"large"} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <ForgotPasswordText className="forgot-password-text">
                Forgot password? Click{' '}
                <ForgotPasswordLinkButton onClick={switchToForgotPasswordPage}>
                  here
                </ForgotPasswordLinkButton>
              </ForgotPasswordText>
              <Text className="sign-up-text">
                Don’t have an account? Sign up{' '}
                <Link to="/signup" component={Typography.Link}>
                  here
                </Link>
              </Text>
            </ContentDiv>
        );
      case ModalContent.ForgotPassword:
        return (
            <div className="content">
              <Text>
                Enter email address associated with account
              </Text>
              <Text>Email</Text>
              <Input placeholder="Email" />
            </div>
        );
      case ModalContent.ResetPassword:
        return (
            <div className="content">
              <Text className="password-reset-text">
                Keep an eye on your inbox (and check your spam folder as well). If
                you still haven’t received an email,{' '}
                <Button className="resend-email-page-link" type="link">
                  click here
                </Button>{' '}
                to resend it
              </Text>
            </div>
        );
    }
  };

  const getTitle = (currentPage: ModalContent): string => {
    switch (currentPage) {
      case ModalContent.LoginContent:
        return 'Log in to your account';
      case ModalContent.ForgotPassword:
        return 'Reset your password';
      case ModalContent.ResetPassword:
        return 'Your password reset link is on the way!';
    }
  };

  const handleOk = (): void => {
    switch (currentPage) {
      case ModalContent.LoginContent:
        dispatch(login({ email, password }));
        break;
      case ModalContent.ForgotPassword:
        setPage(ModalContent.ResetPassword);
        break;
      case ModalContent.ResetPassword:
        props.onCloseLoginModal();
        break;
    }
  };

  const getOkText = (): string => {
    switch (currentPage) {
      case ModalContent.LoginContent:
        return 'Sign In';
      case ModalContent.ForgotPassword:
        return 'Send Link';
      case ModalContent.ResetPassword:
        return '';
    }
  };

  return (
    <div className="modal">
      <StyledModal
        visible={props.showLoginModal}
        title={getTitle(currentPage)}
        onOk={handleOk}
        okText={getOkText()}
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
