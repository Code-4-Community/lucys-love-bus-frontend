import { Alert, Button, Checkbox, Form, Typography } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContentContainer } from '../../components';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { requestToDeactivateAccount } from './ducks/thunks';

const { Title, Paragraph, Text } = Typography;

const DeactivateAccount: React.FC<{ deactivateAccount }> = ({
  deactivateAccount,
}) => {
  const dispatch = useDispatch();
  const onFinish = () => {
    // delete the account
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
            <Link to="/">
              <Text>Go back to the home page</Text>
            </Link>
          </>
        ) : (
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
              {asyncRequestIsComplete(deactivateAccount) && (
                <Alert
                  message="Error"
                  description={deactivateAccount.error}
                  type="error"
                  showIcon
                />
              )}

              <Form.Item>
                <Button
                  type="primary"
                  danger
                  className="button-style"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </ContentContainer>
    </>
  );
};
const mapStateToProps = (
  state: C4CState,
): { tokens: any; deactivateAccount: any } => {
  return {
    tokens: state.authenticationState.tokens,
    deactivateAccount: state.deactivateAccountState.deactivateAccount,
  };
};

export default connect(mapStateToProps)(DeactivateAccount);
