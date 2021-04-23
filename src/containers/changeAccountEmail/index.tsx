import { Alert, Button, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import ProtectedApiClient from '../../api/protectedApiClient';
import ConfirmationMessage from '../../components/ConfirmationMessage';
import FormContainer from '../../components/FormContainer';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';
import { ChangeEmailRequest } from './ducks/types';

const { Title, Link } = Typography;

const UpdateButton = styled(Button)`
  margin-top: 20px;
`;

const ChangeAccountEmail: React.FC = () => {
  const [changeEmail, setChangeEmail] = useState<AsyncRequest<void, any>>(
    AsyncRequestNotStarted(),
  );

  const onFinishChangeEmail = async (values: ChangeEmailRequest) => {
    try {
      setChangeEmail(AsyncRequestLoading());
      await ProtectedApiClient.changeAccountEmail(values);
      setChangeEmail(AsyncRequestCompleted(undefined));
    } catch (err) {
      setChangeEmail(AsyncRequestFailed(err));
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Account Email</title>
        <meta name="description" content="Change primary account email" />
      </Helmet>
      <FormContainer>
        <Title>Change Account Email</Title>
        {!asyncRequestIsComplete(changeEmail) ? (
          <Form name="basic" layout="vertical" onFinish={onFinishChangeEmail}>
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
            {asyncRequestIsFailed(changeEmail) && (
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
              <UpdateButton
                type="primary"
                htmlType="submit"
                disabled={asyncRequestIsLoading(changeEmail)}
              >
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
      </FormContainer>
    </>
  );
};

export default ChangeAccountEmail;
