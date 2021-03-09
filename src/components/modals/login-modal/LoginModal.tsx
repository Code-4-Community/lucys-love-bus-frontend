import React, { useState } from 'react';
import { Input, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { login } from '../../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import Text from 'antd/es/typography/Text';
import { Link } from 'react-router-dom';
import { C4CState } from '../../../store';
import { AsyncRequest, AsyncRequestKinds } from '../../../utils/asyncRequest';
import { TokenPayload } from '../../../auth/ducks/types';
import authClient from '../../../auth/authClient';

interface LoginModalProps {
  showLoginModal: boolean;
  onCloseLoginModal: () => void;
}

interface StateProps {
  tokens: AsyncRequest<TokenPayload, any>;
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
  text-align: center;
`;

const ForgotPasswordLinkButton = styled(Typography.Link)`
  color: black;
  white-space: nowrap;
  background-color: transparent;
  border: transparent;
  padding: 0px 0px 0px 0px;
`;

const EmailInput = styled(Input)`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 272px;
`;

const PasswordInput = styled(Input.Password)`
  margin-bottom: 10px;
  width: 272px;
`;

const LoginModal: React.FC<LoginModalProps & StateProps> = ({
  tokens,
  onCloseLoginModal,
  showLoginModal,
}) => {
  const [currentPage, setPage] = useState<ModalContent>(
    ModalContent.LoginContent,
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const setToForgotPasswordPage = () => {
    setPage(ModalContent.ForgotPassword);
  };

  const getModalContent = () => {
    switch (currentPage) {
      case ModalContent.LoginContent:
        return (
          <ContentDiv>
            <EmailInput
              size="large"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              size="large"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Text>
              Forgot password?{' '}
              <ForgotPasswordLinkButton onClick={setToForgotPasswordPage}>
                Click here
              </ForgotPasswordLinkButton>
            </Text>
            <Text>
              Don’t have an account?{' '}
              <Link to="/signup" component={Typography.Link}>
                Sign up here
              </Link>
            </Text>
            {tokens.kind === AsyncRequestKinds.Failed && (
              <Text>{tokens.error}</Text>
            )}
          </ContentDiv>
        );
      case ModalContent.ForgotPassword:
        return (
          <ContentDiv>
            <Text>Enter email address associated with account</Text>
            <EmailInput
              size="large"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </ContentDiv>
        );
      case ModalContent.ResetPassword:
        return (
          <ContentDiv>
            <Text>
              Keep an eye on your inbox (and check your spam folder as well). If
              you still haven’t received an email,{' '}
              <Typography.Link>click here</Typography.Link> to resend it.
            </Text>
          </ContentDiv>
        );
    }
  };

  const getTitle = (): string => {
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
    // tslint:disable-next-line:no-console
    console.log('HANDLING OK');
    switch (currentPage) {
      case ModalContent.LoginContent:
        dispatch(login({ email, password }));
        break;
      case ModalContent.ForgotPassword:
        // tslint:disable-next-line:no-console
        console.log(email);
        authClient
          .forgotPassword({ email })
          .then(() => {
            setPage(ModalContent.ResetPassword);
          })
          .catch((err) => {
            alert('Forgot password request unsuccessful!');
          });
        // TODO: handle error case better
        break;
      case ModalContent.ResetPassword:
        onCloseLoginModal();
        setPage(ModalContent.LoginContent);
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
    <div>
      <StyledModal
        visible={showLoginModal}
        title={getTitle()}
        onOk={handleOk}
        okText={getOkText()}
        onCancel={() => {
          onCloseLoginModal();
          setPage(ModalContent.LoginContent);
        }}
        width={'625px'}
      >
        {getModalContent()}
      </StyledModal>
    </div>
  );
};

const mapStateToProps = (state: C4CState): StateProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(LoginModal);
