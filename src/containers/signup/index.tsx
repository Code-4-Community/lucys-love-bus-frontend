import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { signup } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { C4CState } from '../../store';
import {
  PrivilegeLevel,
  SignupRequest,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { ContentContainer } from '../../components';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { Routes } from '../../App';

const { Title, Paragraph } = Typography;

type SignupProps = UserAuthenticationReducerState;

const Signup: React.FC<SignupProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values: SignupRequest) => {
    dispatch(signup(values));
  };

  if (getPrivilegeLevel(tokens) !== PrivilegeLevel.NONE) {
    history.push(Routes.HOME);
  }

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <Title>Sign Up</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!',
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Paragraph>
            Already have an account? Log in{' '}
            <Link to="/login" component={Typography.Link}>
              here
            </Link>
            !
          </Paragraph>

          {tokens.kind === AsyncRequestKinds.Failed && (
            <Paragraph>{tokens.error}</Paragraph>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Signup);
