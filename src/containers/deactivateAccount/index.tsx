import { Alert, Button, Checkbox, Form, Typography } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { requestToDeactivateAccount } from './ducks/thunks';
import { DeactivateAccountReducerState } from './ducks/types';
const { Title, Link } = Typography;

interface DeactivateAccountProps {
  deactivateAccount: DeactivateAccountReducerState['deactivateAccount'];
  tokens: UserAuthenticationReducerState['tokens'];
}

const DeactivateAccount: React.FC<DeactivateAccountProps> = ({
  deactivateAccount,
  tokens,
}) => {
  const dispatch = useDispatch();
  const onFinish = () => {
    dispatch(requestToDeactivateAccount());
  };

  return (
    <>
      <Helmet>
        <title>Deactivate Account</title>
        <meta name="description" content="Permanently delete your account." />
      </Helmet>
      <ContentContainer>
        <Title>Deactivate Account</Title>
        {asyncRequestIsComplete(deactivateAccount) ? (
          <>
            <Title level={3}>Account Successfully Deactivated</Title>
            <RouterLink to="/">
              <Link>Back to the home page</Link>
            </RouterLink>
          </>
        ) : asyncRequestIsComplete(tokens) ? (
          <>
            <Title level={3}>
              Warning: This action is permanent and cannot be undone
            </Title>
            <Form onFinish={onFinish}>
              <Form.Item
                name="deactivateAccount"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    type: 'enum',
                    enum: [true],
                    message:
                      'Please check this box to confirm account deletion',
                  },
                ]}
              >
                <Checkbox>
                  By checking this box you acknowledge that your information
                  will be erased from our system and cannot be recovered
                  including any registrations for future events or requests for
                  Participating Family status.
                </Checkbox>
              </Form.Item>
              {asyncRequestIsFailed(deactivateAccount) && (
                <Alert
                  message="Error"
                  description={deactivateAccount.error}
                  type="error"
                  showIcon
                />
              )}

              <Form.Item>
                <Button
                  size="large"
                  disabled={asyncRequestIsLoading(deactivateAccount)}
                  type="ghost"
                  danger
                  htmlType="submit"
                >
                  Delete My Account
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <Redirect to="/" /> // if you arent authenticated and you didnt just delete your account, we dont want to show anything
        )}
      </ContentContainer>
    </>
  );
};
const mapStateToProps = (state: C4CState): DeactivateAccountProps => {
  return {
    tokens: state.authenticationState.tokens,
    deactivateAccount: state.deactivateAccountState.deactivateAccount,
  };
};

export default connect(mapStateToProps)(DeactivateAccount);
