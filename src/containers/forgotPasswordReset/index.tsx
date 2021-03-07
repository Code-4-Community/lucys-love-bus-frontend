import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Typography, Alert } from 'antd';
import authClient from '../../auth/authClient';

const { Title } = Typography;

interface NewPasswords {
  readonly password: string;
  readonly confirmPassword: string;
}

const ForgotPasswordReset: React.FC = () => {
  const { key } = useParams();

  const [state, setState] = useState<NewPasswords>({
    password: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState<string>('')

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setState({password: e.target.value, confirmPassword: state.confirmPassword })
    checkPasswords();
  }

  const updateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setState({password: state.password, confirmPassword: e.target.value })
    checkPasswords();
  }

  const checkPasswords = () => {
    if (state.password !== state.confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      setMessage('');
    }
  }

  const differentPasswords: () => boolean = () =>
    state.password !== state.confirmPassword;

  const onFinish = (values: NewPasswords) => {
    if (message !== '') {

      alert('New password is too weak. Must be at least 8 characters long.');
    } else if (values.password !== values.confirmPassword) {
      alert("Passwords don't match");
    } else {
      authClient
        .forgotPasswordReset({ secretKey: key, newPassword: values.password })
        .then(() => {
          alert('Successfully reset password!');
        })
        .catch((err) => {
          alert('Was not able to reset password.');
        });
    }
  };
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Forgot Password</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              { min: 8, message: 'New password is too weak. Must be at least 8 characters long.' }
            ]}
          >
            <Input.Password onChange={updatePassword}/>
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              { required: differentPasswords(), message: "Passwords don't match"}
            ]}
          >
            <Input.Password onChange={updateConfirmPassword}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ForgotPasswordReset;
