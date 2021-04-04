import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { ContentContainer } from '../../components';
import ConfirmationMessage from '../../components/ConfirmationMessage';
import { Link as RouterLink } from 'react-router-dom';
import ProtectedApiClient from '../../api/protectedApiClient';
import styled from 'styled-components';

const { Title, Link } = Typography;

const UpdateButton = styled(Button)`
  margin-top: 20px;
`;

const ChangeAccountEmail: React.FC = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);

  const onFinishChangeEmail = async (values: any) => {
    try {
      setError(false);
      setIsLoading(true);
      await ProtectedApiClient.changeAccountEmail(values);
      setEmailChanged(true);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Account Email</title>
        <meta
          name="Change account email"
          content="Change primary account email"
        />
      </Helmet>
      <ContentContainer>
        <Title>Change Account Email</Title>
        {!emailChanged ? (
          <Form name="basic" onFinish={onFinishChangeEmail}>
            <Form.Item
              label="New Email"
              name="newEmail"
              rules={[
                {
                  required: true,
                  message: 'Please input a new email.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Current Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your current password.',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {error && (
              <Alert
                message="Error"
                description={
                  'Change account email failed. Please make sure your password is correct and your new email is different than your current.'
                }
                type="error"
                showIcon
              />
            )}
            <Form.Item>
              <UpdateButton type="primary" htmlType="submit" disabled={loading}>
                Update Email
              </UpdateButton>
            </Form.Item>
            Note that this will change the email associated with the primary
            account owner that receives all notifications and updates.
          </Form>
        ) : (
          <ConfirmationMessage
            title="Change Account Email"
            message="Your primary account email has been changed!"
            details={
              <span>
                An email to confirm this update is on its way. Click
                {
                  <RouterLink to="/">
                    {' '}
                    <Link>here</Link>{' '}
                  </RouterLink>
                }{' '}
                to return to the homepage.
              </span>
            }
          />
        )}
      </ContentContainer>
    </>
  );
};

export default ChangeAccountEmail;
