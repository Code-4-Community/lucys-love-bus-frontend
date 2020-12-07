import {Anchor, Button, Form, Input} from 'antd';
import React from 'react';
import './login-content.less';
import Text from 'antd/es/typography/Text';
import styled from 'styled-components';

interface Props {
  switchToForgotPasswordPage: () => void;
}

const ContentDiv = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const TitleText = styled(Text)``;

const ForgotPasswordLinkButton = styled(Anchor)`
  color: black;
  white-space: nowrap;
  background-color: transparent;
  border: transparent;
  padding: 0px 0px 0px 0px;
`;

const ForgotPasswordText = styled(Text)`
  color: #000000;
`;

const EmailField = styled(Form.Item)`
`

const LoginContent: (props: Props) => JSX.Element = (props: Props) => {
  const signUpLink = <Button className="page-link">here</Button>;

  return (
    <ContentDiv>
      <TitleText>Login to your account</TitleText>
      <Form>
          <Form.Item
              name="username"
              rules={[{ required: true }]}
              className="email-field"
          >
              <Input className="input-style" placeholder="Email" />
          </Form.Item>
          <Form.Item
              name="password"
              rules={[{ required: true }]}
              className="password-field"
          >
              <Input.Password className="input-style" placeholder="Password" />
          </Form.Item>
      </Form>
      <Button
        className="login-button"
        type="primary"
        style={{
          position: 'absolute',
          background: '#505050',
          borderRadius: '6px',
          height: '45px',
          width: '115px',
        }}
      >
        Sign In
      </Button>
      <ForgotPasswordText className="forgot-password-text">
        Forgot password? Click{' '}
        <ForgotPasswordLinkButton
          onClick={props.switchToForgotPasswordPage}
        >
          here
        </ForgotPasswordLinkButton>
      </ForgotPasswordText>
      <Text className="sign-up-text">
        Don’t have an account? Sign up {signUpLink}
      </Text>
    </ContentDiv>
  );
};

export default LoginContent;
